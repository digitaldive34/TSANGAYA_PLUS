<?php

namespace App\Http\Controllers\ProgrammeOfficer;

use App\Http\Controllers\Controller;
use App\Models\Learner;
use App\Models\Centre;
use App\Support\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LearnerController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'class_group' => ['nullable', 'in:Class A,Class B'],
            'status' => ['nullable', 'in:active,inactive'],
            'centre_id' => ['nullable', 'exists:centres,id'],
        ]);

        return Inertia::render('programme-officer/learners/index', [
            'learners' => Learner::with('centre')
                ->when($filters['search'] ?? null, function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('full_name', 'like', "%{$search}%")
                            ->orWhere('learner_code', 'like', "%{$search}%")
                            ->orWhereHas(
                                'centre',
                                fn ($centreQuery) => $centreQuery
                                    ->where('name', 'like', "%{$search}%")
                            );
                    });
                })
                ->when(
                    $filters['class_group'] ?? null,
                    fn ($query, $classGroup) =>
                        $query->where('class_group', $classGroup)
                )
                ->when(
                    $filters['status'] ?? null,
                    fn ($query, $status) => $query->where('status', $status)
                )
                ->when(
                    $filters['centre_id'] ?? null,
                    fn ($query, $centreId) =>
                        $query->where('centre_id', $centreId)
                )
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'totalLearners' => Learner::count(),
            'centres' => Centre::orderBy('name')->get(['id', 'name']),
            'filters' => [
                'search' => $filters['search'] ?? '',
                'class_group' => $filters['class_group'] ?? '',
                'status' => $filters['status'] ?? '',
                'centre_id' => $filters['centre_id'] ?? '',
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('programme-officer/learners/create', [
            'centres' => Centre::where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'age' => ['nullable', 'integer', 'min:1', 'max:15'],
            'class_group' => ['required', 'in:Class A,Class B'],
            'centre_id' => ['required', 'exists:centres,id'],
            'registration_date' => ['required', 'date'],
            'consent_status' => ['required', 'in:Pending,Granted,Declined'],
        ]);

        if (
            $validated['age'] !== null &&
            (
                ($validated['age'] <= 10 && $validated['class_group'] !== 'Class A') ||
                ($validated['age'] > 10 && $validated['class_group'] !== 'Class B')
            )
        ) {
            return back()->withErrors([
                'class_group' => 'The selected class does not match the learner age. Class A is for ages 10 and below, while Class B is for ages 11 to 15.',
            ])->withInput();
        }

        $learner = DB::transaction(function () use ($validated) {
            $centre = Centre::where('id', $validated['centre_id'])
                ->lockForUpdate()
                ->firstOrFail();

            $prefix = collect(preg_split('/[\s\/]+/', trim($centre->name)))
                ->filter()
                ->reject(fn ($word) => Str::lower($word) === 'tsangaya')
                ->take(2)
                ->map(fn ($word) => Str::upper(Str::substr($word, 0, 1)))
                ->implode('');

            $lastLearner = Learner::where('centre_id', $centre->id)
                ->orderByDesc('id')
                ->first();

            $nextNumber = $lastLearner
                ? (int) substr($lastLearner->learner_code, strlen($prefix) + 1) + 1
                : 1;

            $learnerCode = $prefix . '-' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);

            $consentRecorded = $validated['consent_status'] !== 'Pending';

            return Learner::create([
                ...$validated,
                'learner_code' => $learnerCode,
                'registered_by' => Auth::id(),
                'consent_date' => $consentRecorded ? now()->toDateString() : null,
                'consent_recorded_by' => $consentRecorded ? Auth::id() : null,
            ]);
        });

        ActivityLogger::log(
            'learner.created',
            "Registered learner {$learner->full_name} ({$learner->learner_code}).",
            $learner
        );

        return redirect()
            ->route('programme-officer.learners.index')
            ->with('success', 'Learner registered successfully.');
    }

    public function show(Learner $learner)
    {
        $learner->load([
            'centre',
            'registeredBy',
        ]);

        return Inertia::render('programme-officer/learners/show', [
            'learner' => $learner,
        ]);
    }

    public function edit(Learner $learner)
    {
        $learner->load('centre');

        return Inertia::render('programme-officer/learners/edit', [
            'learner' => $learner,
        ]);
    }

    public function update(Request $request, Learner $learner)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'age' => ['nullable', 'integer', 'min:1', 'max:15'],
            'registration_date' => ['required', 'date'],
            'status' => ['required', 'in:active,inactive'],
            'consent_status' => ['required', 'in:Pending,Granted,Declined'],
        ]);

        if (
            $validated['age'] !== null &&
            (
                ($validated['age'] <= 10 && $learner->class_group !== 'Class A') ||
                ($validated['age'] > 10 && $learner->class_group !== 'Class B')
            )
        ) {
            return back()->withErrors([
                'age' => 'This age does not match the learner’s current class. Use the class movement process to change class placement.',
            ])->withInput();
        }

        if ($learner->consent_status !== $validated['consent_status']) {
            $validated['consent_date'] =
                $validated['consent_status'] === 'Pending'
                    ? null
                    : now()->toDateString();

            $validated['consent_recorded_by'] =
                $validated['consent_status'] === 'Pending'
                    ? null
                    : Auth::id();
        }

        $learner->update($validated);

        ActivityLogger::log(
            'learner.updated',
            "Updated information for learner {$learner->full_name} ({$learner->learner_code}).",
            $learner
        );

        return redirect()
            ->route('programme-officer.learners.show', $learner->id)
            ->with('success', 'Learner information updated successfully.');
    }
}
