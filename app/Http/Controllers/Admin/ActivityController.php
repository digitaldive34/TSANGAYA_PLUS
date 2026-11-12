<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::with('user')
            ->latest()
            ->paginate(15);

        return Inertia::render('admin/activities/index', [
            'activities' => $activities,
        ]);
    }
}
