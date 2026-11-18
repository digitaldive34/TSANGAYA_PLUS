<?php

namespace App\Http\Controllers\ProgrammeOfficer;

use App\Http\Controllers\Controller;
use App\Models\Learner;
use App\Models\LearningSession;
use App\Models\Activity;
use App\Models\WelfareNeed;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('programme-officer/dashboard', [
            'totalLearners' => Learner::count(),

            'activeLearners' => Learner::where('status', 'active')->count(),

            'newLearnersThisMonth' => Learner::whereBetween('registration_date', [
                now()->startOfMonth()->toDateString(),
                now()->endOfMonth()->toDateString(),
            ])->count(),

            'openWelfareNeeds' => WelfareNeed::where('status', 'Open')->count(),

            'resolvedWelfareNeeds' => WelfareNeed::where('status', 'Resolved')
                ->count(),

            'totalSessions' => LearningSession::count(),

            'recentTeacherActivities' => Activity::with('user')
                ->where('role', 'Teacher')
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }
}