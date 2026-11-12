<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\AssessmentRecord;
use App\Models\Attendance;
use App\Models\LearningSession;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $teacherId = auth()->id();
        $attendanceRecords = Attendance::whereHas(
            'learningSession',
            fn ($query) => $query->where('teacher_id', $teacherId)
        );
        $totalAttendanceRecords = (clone $attendanceRecords)->count();
        $presentAttendanceRecords = (clone $attendanceRecords)
            ->where('status', 'Present')
            ->count();

        return Inertia::render('teacher/dashboard', [
            'totalSessions' => LearningSession::where('teacher_id', $teacherId)
                ->count(),

            'scheduledSessions' => LearningSession::where('teacher_id', $teacherId)
                ->where('status', 'Scheduled')
                ->count(),

            'deliveredSessions' => LearningSession::where('teacher_id', $teacherId)
                ->where('status', 'Delivered')
                ->count(),

            'attendanceRate' => $totalAttendanceRecords > 0
                ? round($presentAttendanceRecords / $totalAttendanceRecords * 100, 1)
                : null,

            'assessmentRecords' => AssessmentRecord::where(
                'recorded_by',
                $teacherId
            )->count(),

            'sessions' => LearningSession::with([
                'centre',
                'subject',
            ])
                ->where('teacher_id', $teacherId)
                ->latest('session_date')
                ->paginate(10),
        ]);
    }
}