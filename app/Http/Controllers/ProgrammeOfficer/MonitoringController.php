<?php

namespace App\Http\Controllers\ProgrammeOfficer;

use App\Http\Controllers\Controller;
use App\Models\AssessmentRecord;
use App\Models\Attendance;
use App\Models\Centre;
use App\Models\LearningSession;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MonitoringController extends Controller
{
    public function attendance(Request $request)
    {
        $validated = $request->validate([
            'centre_id' => ['nullable', 'exists:centres,id'],
            'session_id' => ['nullable', 'exists:learning_sessions,id'],
        ]);

        $sessions = LearningSession::with([
            'centre',
            'subject',
            'teacher',
        ])
            ->when(
                $validated['centre_id'] ?? null,
                fn ($query, $centreId) =>
                    $query->where('centre_id', $centreId)
            )
            ->when(
                $validated['session_id'] ?? null,
                fn ($query, $sessionId) =>
                    $query->where('id', $sessionId)
            )
            ->latest('session_date')
            ->get();

        $attendance = Attendance::with([
            'learner',
            'markedBy',
            'learningSession.centre',
            'learningSession.subject',
        ])
            ->whereIn('learning_session_id', $sessions->pluck('id'))
            ->get()
            ->groupBy('learning_session_id');

        return Inertia::render('programme-officer/monitoring/attendance', [
            'centres' => Centre::orderBy('name')->get(['id', 'name']),
            'sessions' => $sessions,
            'attendance' => $attendance,
            'filters' => $validated,
        ]);
    }

    public function assessments(Request $request)
    {
        $validated = $request->validate([
            'centre_id' => ['nullable', 'exists:centres,id'],
            'subject_id' => ['nullable', 'exists:subjects,id'],
            'class_group' => ['nullable', 'in:Class A,Class B'],
        ]);

        $records = AssessmentRecord::with([
            'learner.centre',
            'subject',
            'recordedBy',
        ])
            ->when(
                $validated['centre_id'] ?? null,
                fn ($query, $centreId) =>
                    $query->whereHas(
                        'learner',
                        fn ($learnerQuery) =>
                            $learnerQuery->where('centre_id', $centreId)
                    )
            )
            ->when(
                $validated['subject_id'] ?? null,
                fn ($query, $subjectId) =>
                    $query->where('subject_id', $subjectId)
            )
            ->when(
                $validated['class_group'] ?? null,
                fn ($query, $classGroup) =>
                    $query->where('class_group', $classGroup)
            )
            ->latest()
            ->get();

        return Inertia::render('programme-officer/monitoring/assessments', [
            'centres' => Centre::orderBy('name')->get(['id', 'name']),
            'subjects' => Subject::orderBy('name')->get(['id', 'name']),
            'records' => $records,
            'filters' => $validated,
        ]);
    }
}
