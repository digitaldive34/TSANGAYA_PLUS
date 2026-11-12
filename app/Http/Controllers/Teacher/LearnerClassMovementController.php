<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Learner;
use App\Models\LearningSession;
use App\Support\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class LearnerClassMovementController extends Controller
{
    public function store(Request $request, Learner $learner)
    {
        $validated = $request->validate([
            'new_class' => ['required', 'in:Class A,Class B'],
            'reason' => ['required', 'string', 'max:1000'],
            'effective_date' => ['required', 'date'],
        ]);

        abort_unless($learner->status === 'active', 403);

        $assigned = LearningSession::where('teacher_id', auth()->id())
            ->where('centre_id', $learner->centre_id)
            ->exists();

        abort_unless($assigned, 403);

        $movement = DB::transaction(function () use ($validated, $learner) {
            $learner = Learner::whereKey($learner->id)
                ->lockForUpdate()
                ->firstOrFail();

            if ($learner->class_group === $validated['new_class']) {
                throw ValidationException::withMessages([
                    'new_class' => 'The learner is already in this class.',
                ]);
            }

            $previousClass = $learner->class_group;

            $movement = $learner->classMovements()->create([
                'previous_class' => $previousClass,
                'new_class' => $validated['new_class'],
                'reason' => $validated['reason'],
                'effective_date' => $validated['effective_date'],
                'recorded_by' => auth()->id(),
            ]);

            $learner->update([
                'class_group' => $validated['new_class'],
            ]);

            return $movement;
        });

        ActivityLogger::log(
            'learner.class_moved',
            "Moved learner {$learner->full_name} ({$learner->learner_code}) from {$movement->previous_class} to {$movement->new_class}. Reason: {$movement->reason}",
            $learner
        );

        return back()->with(
            'success',
            'Learner class movement recorded successfully.'
        );
    }
}
