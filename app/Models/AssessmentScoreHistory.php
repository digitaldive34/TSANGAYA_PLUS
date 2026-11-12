<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentScoreHistory extends Model
{
    protected $fillable = [
        'assessment_record_id',
        'assessment_type',
        'old_score',
        'new_score',
        'changed_by',
    ];

    public function assessmentRecord(): BelongsTo
    {
        return $this->belongsTo(AssessmentRecord::class);
    }

    public function changedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}