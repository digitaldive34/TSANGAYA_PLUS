<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\StaffAccountCreated;
use App\Models\Centre;
use App\Models\Role;
use App\Models\User;
use App\Support\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'role' => ['nullable', 'exists:roles,name'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);

        $users = User::with(['role', 'centre'])
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhereHas(
                            'role',
                            fn ($roleQuery) => $roleQuery
                                ->where('name', 'like', "%{$search}%")
                        )
                        ->orWhereHas(
                            'centre',
                            fn ($centreQuery) => $centreQuery
                                ->where('name', 'like', "%{$search}%")
                        );
                });
            })
            ->when(
                $filters['role'] ?? null,
                fn ($query, $role) =>
                    $query->whereHas(
                        'role',
                        fn ($roleQuery) => $roleQuery->where('name', $role)
                    )
            )
            ->when(
                $filters['status'] ?? null,
                fn ($query, $status) => $query->where('status', $status)
            )
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'roles' => Role::orderBy('name')->pluck('name'),
            'filters' => [
                'search' => $filters['search'] ?? '',
                'role' => $filters['role'] ?? '',
                'status' => $filters['status'] ?? '',
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/users/create', [
            'roles' => Role::orderBy('name')->get(['id', 'name']),
            'centres' => Centre::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('admin/users/show', [
            'user' => $user->load(['role', 'centre']),
        ]);
    }

    public function store(Request $request)
    {
        $teacherRoleId = Role::where('name', 'Teacher')->value('id');

        $staffRoleIds = Role::whereIn('name', [
            'Teacher',
            'Programme Officer',
        ])->pluck('id')->all();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['required', 'string', 'max:30'],
            'gender' => ['nullable', 'in:Male,Female'],
            'role_id' => ['required', 'exists:roles,id'],
            'centre_id' => [
                Rule::requiredIf(
                    in_array((int) $request->role_id, $staffRoleIds)
                ),
                'nullable',
                'exists:centres,id',
            ],
            'qualification' => [
                Rule::requiredIf(
                    (int) $request->role_id === (int) $teacherRoleId
                ),
                'nullable',
                'string',
                'max:255',
            ],
            'photo' => ['nullable', 'image', 'max:2048'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')
                ->store('staff-photos', 'public');
        }

        $validated['status'] = 'active';

        $user = User::create($validated);
        $user->load('role');

        ActivityLogger::log(
            'user.created',
            "Created a staff account for {$user->name}.",
            $user
        );

        try {
            Mail::to($user->email)->send(new StaffAccountCreated($user));
        } catch (TransportExceptionInterface $exception) {
            Log::warning('Failed to send staff account email.', [
                'user_id' => $user->id,
                'exception' => $exception::class,
            ]);

            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'The account was created, but the welcome email could not be delivered. Check SMTP configuration.',
            ]);

            return redirect()->route('admin.users.index');
        }

        $successMessage = config('mail.default') === 'log'
            ? 'User created. The email was written to the application log; configure SMTP to deliver it.'
            : 'User created and account email sent successfully.';

        Inertia::flash('toast', [
            'type' => config('mail.default') === 'log' ? 'info' : 'success',
            'message' => $successMessage,
        ]);

        return redirect()
            ->route('admin.users.index')
            ->with('success', $successMessage);
    }

    public function edit(User $user)
    {
        return Inertia::render('admin/users/edit', [
            'user' => $user->load(['role', 'centre']),
            'roles' => Role::orderBy('name')->get(['id', 'name']),
            'centres' => Centre::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $oldStatus = $user->status;

        $teacherRoleId = Role::where('name', 'Teacher')->value('id');

        $staffRoleIds = Role::whereIn('name', [
            'Teacher',
            'Programme Officer',
        ])->pluck('id')->all();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'phone' => ['required', 'string', 'max:30'],
            'gender' => ['nullable', 'in:Male,Female'],
            'role_id' => ['required', 'exists:roles,id'],
            'centre_id' => [
                Rule::requiredIf(
                    in_array((int) $request->role_id, $staffRoleIds)
                ),
                'nullable',
                'exists:centres,id',
            ],
            'qualification' => [
                Rule::requiredIf(
                    (int) $request->role_id === (int) $teacherRoleId
                ),
                'nullable',
                'string',
                'max:255',
            ],
            'photo' => ['nullable', 'image', 'max:2048'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        if ($request->hasFile('photo')) {
            if ($user->photo) {
                Storage::disk('public')->delete($user->photo);
            }

            $validated['photo'] = $request->file('photo')
                ->store('staff-photos', 'public');
        }

        $passwordUpdated = !empty($validated['password']);

        if (!$passwordUpdated) {
            unset($validated['password']);
        }

        $user->update($validated);

        $action = $oldStatus !== $user->status
            ? 'user.status_updated'
            : 'user.updated';

        $description = "Updated the staff account for {$user->name}.";

        if ($oldStatus !== $user->status) {
            $description .= " Account status changed from {$oldStatus} to {$user->status}.";
        }

        if ($passwordUpdated) {
            $description .= ' Password was also updated.';
        }

        ActivityLogger::log(
            $action,
            $description,
            $user
        );

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }
}
