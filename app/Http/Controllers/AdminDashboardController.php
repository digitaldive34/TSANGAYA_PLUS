<?php

namespace App\Http\Controllers;

use App\Models\Learner;
use App\Models\Centre;
use App\Models\User;
use App\Models\LearningSession;
use App\Models\Activity;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'totalLearners' => Learner::count(),

            'activeLearners' => Learner::where('status', 'active')->count(),

            'activeCentres' => Centre::where('status', 'active')->count(),

            'staffMembers' => User::count(),

            'totalSessions' => LearningSession::count(),

            'scheduledSessions' => LearningSession::where('status', 'Scheduled')
                ->count(),

            'deliveredSessions' => LearningSession::where('status', 'Delivered')
                ->count(),

            'recentActivities' => Activity::with('user')
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }
}
