<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Centre;
use App\Support\ActivityLogger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CentreController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);

        return Inertia::render('admin/centres/index', [
            'centres' => Centre::query()
                ->when($filters['search'] ?? null, function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('location', 'like', "%{$search}%");
                    });
                })
                ->when(
                    $filters['status'] ?? null,
                    fn ($query, $status) => $query->where('status', $status)
                )
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'totalCentres' => Centre::count(),
            'activeCentres' => Centre::where('status', 'active')->count(),
            'filters' => [
                'search' => $filters['search'] ?? '',
                'status' => $filters['status'] ?? '',
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/centres/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'learner_population' => ['nullable', 'integer', 'min:0'],
            'internet_availability' => ['nullable', 'string', 'max:255'],
            'electricity_availability' => ['nullable', 'string', 'max:255'],
            'technology_readiness' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        $centre = Centre::create($validated);

        ActivityLogger::log(
            'centre.created',
            "Created the centre {$centre->name}.",
            $centre
        );

        return redirect()
            ->route('admin.centres.index')
            ->with('success', 'Centre registered successfully.');
    }

    public function show(Centre $centre)
    {
        $centre->loadCount('learners');

        $centre->load([
            'users' => function ($query) {
                $query->whereHas('role', function ($roleQuery) {
                    $roleQuery->where('name', 'Teacher');
                });
            },
        ]);

        return Inertia::render('admin/centres/show', [
            'centre' => $centre,
            'teachersCount' => $centre->users->count(),
        ]);
    }

    public function edit(Centre $centre)
    {
        return Inertia::render('admin/centres/edit', [
            'centre' => $centre,
        ]);
    }

    public function update(Request $request, Centre $centre)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'learner_population' => ['nullable', 'integer', 'min:0'],
            'internet_availability' => ['nullable', 'string', 'max:255'],
            'electricity_availability' => ['nullable', 'string', 'max:255'],
            'technology_readiness' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        $centre->update($validated);

        ActivityLogger::log(
            'centre.updated',
            "Updated the information for {$centre->name}.",
            $centre
        );

        return redirect()
            ->route('admin.centres.show', $centre->id)
            ->with('success', 'Centre information updated successfully.');
    }
}
