<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\AssessmentRecord;
use App\Models\Centre;
use App\Models\LearningSession;
use App\Models\Learner;
use App\Models\Subject;
use App\Support\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function index()
    {
        $registers = LearningSession::with([
            'subject',
            'centre',
        ])
            ->where('teacher_id', auth()->id())
            ->get()
            ->unique(fn ($session) =>
                $session->centre_id . '-' .
                $session->subject_id . '-' .
                $session->class_group
            )
            ->map(fn ($session) => [
                'centre_id' => $session->centre_id,
                'subject_id' => $session->subject_id,
                'class_group' => $session->class_group,
                'centre' => [
                    'name' => $session->centre->name,
                ],
                'subject' => [
                    'name' => $session->subject->name,
                ],
            ])
            ->values();

        return Inertia::render('teacher/assessments/index', [
            'registers' => $registers,
        ]);
    }

    public function show(Request $request)
    {
        $validated = $request->validate([
            'centre_id' => ['required', 'exists:centres,id'],
            'subject_id' => ['required', 'exists:subjects,id'],
            'class_group' => ['required', 'in:Class A,Class B'],
        ]);

        $assigned = LearningSession::where('teacher_id', auth()->id())
            ->where('centre_id', $validated['centre_id'])
            ->where('subject_id', $validated['subject_id'])
            ->where('class_group', $validated['class_group'])
            ->exists();

        abort_unless($assigned, 403);

        $learners = Learner::where('centre_id', $validated['centre_id'])
            ->where('class_group', $validated['class_group'])
            ->where('status', 'active')
            ->orderBy('full_name')
            ->get();

        $assessments = AssessmentRecord::whereIn(
            'learner_id',
            $learners->pluck('id')
        )
            ->where('subject_id', $validated['subject_id'])
            ->get()
            ->groupBy('learner_id');

        return Inertia::render('teacher/assessments/show', [
            'register' => [
                'centre_id' => (int) $validated['centre_id'],
                'subject_id' => (int) $validated['subject_id'],
                'centre' => Centre::findOrFail($validated['centre_id']),
                'subject' => Subject::findOrFail($validated['subject_id']),
                'class_group' => $validated['class_group'],
            ],
            'learners' => $learners,
            'assessments' => $assessments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'centre_id' => ['required', 'exists:centres,id'],
            'subject_id' => ['required', 'exists:subjects,id'],
            'class_group' => ['required', 'in:Class A,Class B'],
            'learner_id' => ['required', 'exists:learners,id'],
            'assessment_type' => ['required', 'in:Baseline,Midline,Endline'],
            'score' => ['required', 'numeric', 'min:0', 'max:100'],
        ]);

        $assigned = LearningSession::where('teacher_id', auth()->id())
            ->where('centre_id', $validated['centre_id'])
            ->where('subject_id', $validated['subject_id'])
            ->where('class_group', $validated['class_group'])
            ->exists();

        abort_unless($assigned, 403);

        $learner = Learner::where('id', $validated['learner_id'])
            ->where('centre_id', $validated['centre_id'])
            ->where('class_group', $validated['class_group'])
            ->where('status', 'active')
            ->firstOrFail();

        $subject = Subject::findOrFail($validated['subject_id']);

        $result = DB::transaction(function () use ($validated, $learner) {
            $record = AssessmentRecord::firstOrCreate(
                [
                    'learner_id' => $learner->id,
                    'subject_id' => $validated['subject_id'],
                ],
                [
                    'class_group' => $validated['class_group'],
                    'recorded_by' => auth()->id(),
                ]
            );

            $scoreColumn = strtolower($validated['assessment_type']) . '_score';

            $oldScore = $record->{$scoreColumn};
            $newScore = $validated['score'];

            if ($oldScore === null || (float) $oldScore !== (float) $newScore) {
                $record->update([
                    $scoreColumn => $newScore,
                    'class_group' => $validated['class_group'],
                    'recorded_by' => auth()->id(),
                ]);

                $record->scoreHistories()->create([
                    'assessment_type' => $validated['assessment_type'],
                    'old_score' => $oldScore,
                    'new_score' => $newScore,
                    'changed_by' => auth()->id(),
                ]);

                return [
                    'record' => $record,
                    'changed' => true,
                    'old_score' => $oldScore,
                    'new_score' => $newScore,
                ];
            }

            return [
                'record' => $record,
                'changed' => false,
                'old_score' => $oldScore,
                'new_score' => $newScore,
            ];
        });

        if ($result['changed']) {
            $changeDescription = $result['old_score'] === null
                ? "Entered {$validated['assessment_type']} score of {$result['new_score']} for {$learner->full_name} in {$subject->name}, {$validated['class_group']}."
                : "Updated {$validated['assessment_type']} score for {$learner->full_name} in {$subject->name}, {$validated['class_group']} from {$result['old_score']} to {$result['new_score']}.";

            ActivityLogger::log(
                'assessment.score_saved',
                $changeDescription,
                $result['record']
            );
        }

        return back()->with('success', 'Assessment score saved successfully.');
    }
}
