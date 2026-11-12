<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentRecord extends Model
{
    protected $fillable = [
        'learner_id',
        'subject_id',
        'class_group',
        'baseline_score',
        'midline_score',
        'endline_score',
        'recorded_by',
    ];

    protected $appends = [
    'final_percentage',
    'grade',
    'performance',
];

    public function learner(): BelongsTo
    {
        return $this->belongsTo(Learner::class);
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    public function scoreHistories(): HasMany
    {
        return $this->hasMany(AssessmentScoreHistory::class);
    }

    public function getFinalPercentageAttribute(): ?float
    {
        $scores = array_filter(
            [
                $this->baseline_score,
                $this->midline_score,
                $this->endline_score,
            ],
            static fn ($score) => $score !== null
        );

        if ($scores === []) {
            return null;
        }

        return round(
            array_sum(array_map('floatval', $scores)) / count($scores),
            2
        );
    }

public function getGradeAttribute(): ?string
{
    if ($this->final_percentage === null) {
        return null;
    }

    return match (true) {
        $this->final_percentage >= 70 => 'A',
        $this->final_percentage >= 60 => 'B',
        $this->final_percentage >= 50 => 'C',
        $this->final_percentage >= 40 => 'D',
        default => 'F',
    };
}

public function getPerformanceAttribute(): ?string
{
    if ($this->final_percentage === null) {
        return null;
    }

    return match (true) {
        $this->final_percentage >= 70 => 'Excellent',
        $this->final_percentage >= 60 => 'Good',
        $this->final_percentage >= 50 => 'Fair',
        default => 'Needs Improvement',
    };
}
}