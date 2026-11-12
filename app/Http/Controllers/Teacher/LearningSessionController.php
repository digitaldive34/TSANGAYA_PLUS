<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\LearningSession;
use Inertia\Inertia;

class LearningSessionController extends Controller
{
    public function show(LearningSession $learningSession)
    {
        abort_unless(
            $learningSession->teacher_id === auth()->id(),
            403
        );

        $learningSession->load([
            'centre',
            'subject',
            'teacher',
            'attendances.learner',
        ]);

        return Inertia::render('teacher/sessions/show', [
            'session' => $learningSession,
        ]);
    }

    public function markDelivered(LearningSession $learningSession)
{
    abort_unless(
        $learningSession->teacher_id === auth()->id(),
        403
    );

    abort_unless(
        $learningSession->status === 'Scheduled',
        403,
        'This session cannot be marked as delivered.'
    );

    $eligibleLearnersCount = \App\Models\Learner::where(
        'centre_id',
        $learningSession->centre_id
    )
        ->where('class_group', $learningSession->class_group)
        ->where('status', 'active')
        ->count();

    $recordedAttendanceCount = $learningSession->attendances()->count();

    if (
        $eligibleLearnersCount === 0 ||
        $recordedAttendanceCount !== $eligibleLearnersCount
    ) {
        return back()->withErrors([
            'attendance' => 'Please complete attendance for every active learner before marking this session as delivered.',
        ]);
    }

    $learningSession->update([
        'status' => 'Delivered',
    ]);

    return back()->with('success', 'Learning session marked as delivered.');
}
}