<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    protected $fillable = [
        'name',
        'description',
        'status',
    ];

public function learningSessions(): HasMany
{
    return $this->hasMany(LearningSession::class);
}

public function assessmentRecords(): HasMany
{
    return $this->hasMany(AssessmentRecord::class);
}
}