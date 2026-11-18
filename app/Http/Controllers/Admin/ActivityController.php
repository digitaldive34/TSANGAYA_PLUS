<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'role' => ['nullable', 'in:Admin,Programme Officer,Teacher'],
        ]);

        $activities = Activity::with('user')
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('action', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('role', 'like', "%{$search}%")
                        ->orWhereHas(
                            'user',
                            fn ($userQuery) => $userQuery
                                ->where('name', 'like', "%{$search}%")
                        );
                });
            })
            ->when(
                $filters['role'] ?? null,
                fn ($query, $role) => $query->where('role', $role)
            )
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/activities/index', [
            'activities' => $activities,
            'filters' => [
                'search' => $filters['search'] ?? '',
                'role' => $filters['role'] ?? '',
            ],
        ]);
    }
}
