<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Centre;
use App\Models\Role;
use App\Models\User;
use App\Support\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with(['role', 'centre'])
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/users/create', [
            'roles' => Role::orderBy('name')->get(['id', 'name']),
            'centres' => Centre::orderBy('name')->get(['id', 'name']),
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

        ActivityLogger::log(
            'user.created',
            "Created a staff account for {$user->name}.",
            $user
        );

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User created successfully.');
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
