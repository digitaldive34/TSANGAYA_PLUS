<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\LearningSession;
use App\Models\Attendance;
use App\Models\Learner;
use App\Support\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function create(LearningSession $learningSession)
    {
        abort_unless(
            $learningSession->teacher_id === auth()->id(),
            403
        );

        abort_unless(
            $learningSession->status === 'Scheduled',
            403,
            'Attendance can only be recorded for scheduled sessions.'
        );

        $learners = Learner::where(
            'centre_id',
            $learningSession->centre_id
        )
            ->where('class_group', $learningSession->class_group)
            ->where('status', 'active')
            ->orderBy('full_name')
            ->get([
                'id',
                'learner_code',
                'full_name',
            ]);

        $existingAttendance = $learningSession->attendances()
            ->get()
            ->keyBy('learner_id');

        return Inertia::render('teacher/sessions/attendance', [
            'session' => $learningSession->load(['centre', 'subject']),
            'learners' => $learners,
            'existingAttendance' => $existingAttendance,
        ]);
    }

    public function store(Request $request, LearningSession $learningSession)
    {
        abort_unless(
            $learningSession->teacher_id === auth()->id(),
            403
        );

        abort_unless(
            $learningSession->status === 'Scheduled',
            403,
            'Attendance can only be recorded for scheduled sessions.'
        );

        $validated = $request->validate([
            'attendance' => ['required', 'array'],
            'attendance.*' => ['required', 'in:Present,Absent'],
        ]);

        $eligibleLearnerIds = Learner::where('centre_id', $learningSession->centre_id)
            ->where('class_group', $learningSession->class_group)
            ->where('status', 'active')
            ->pluck('id')
            ->map(fn ($id) => (int) $id)
            ->all();

        $submittedLearnerIds = array_map(
            'intval',
            array_keys($validated['attendance'])
        );

        sort($eligibleLearnerIds);
        sort($submittedLearnerIds);

        if ($eligibleLearnerIds !== $submittedLearnerIds) {
            return back()->withErrors([
                'attendance' => 'The attendance register must include every active learner in this class.',
            ]);
        }

        DB::transaction(function () use ($validated, $learningSession) {
            foreach ($validated['attendance'] as $learnerId => $status) {
                Attendance::updateOrCreate(
                    [
                        'learning_session_id' => $learningSession->id,
                        'learner_id' => $learnerId,
                    ],
                    [
                        'status' => $status,
                        'marked_by' => auth()->id(),
                    ]
                );
            }
        });

        $total = count($validated['attendance']);
        $present = collect($validated['attendance'])
            ->filter(fn ($status) => $status === 'Present')
            ->count();

        ActivityLogger::log(
            'attendance.recorded',
            "Recorded attendance for {$learningSession->subject->name}, {$learningSession->class_group}: {$present} present out of {$total} learners.",
            $learningSession
        );

        return redirect()
            ->route('teacher.sessions.show', $learningSession->id)
            ->with('success', 'Attendance recorded successfully.');
    }
}
