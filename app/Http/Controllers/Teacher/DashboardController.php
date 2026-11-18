<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\AssessmentRecord;
use App\Models\Attendance;
use App\Models\LearningSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'status' => [
                'nullable',
                'in:Scheduled,Delivered,Cancelled,Rescheduled',
            ],
        ]);

        $teacherId = auth()->id();
        $sessions = LearningSession::with([
            'centre',
            'subject',
        ])
            ->where('teacher_id', $teacherId)
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('topic', 'like', "%{$search}%")
                        ->orWhere('class_group', 'like', "%{$search}%")
                        ->orWhereHas(
                            'centre',
                            fn ($centreQuery) => $centreQuery
                                ->where('name', 'like', "%{$search}%")
                        )
                        ->orWhereHas(
                            'subject',
                            fn ($subjectQuery) => $subjectQuery
                                ->where('name', 'like', "%{$search}%")
                        );
                });
            })
            ->when(
                $filters['status'] ?? null,
                fn ($query, $status) => $query->where('status', $status)
            )
            ->latest('session_date')
            ->paginate(10)
            ->withQueryString();

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

            'sessions' => $sessions,
            'filters' => [
                'search' => $filters['search'] ?? '',
                'status' => $filters['status'] ?? '',
            ],
        ]);
    }
}