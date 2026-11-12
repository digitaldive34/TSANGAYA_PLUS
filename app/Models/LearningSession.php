<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LearningSession extends Model
{
    protected $fillable = [
    'centre_id',
    'subject_id',
    'teacher_id',
    'class_group',
    'topic',
    'session_date',
    'status',
];

    public function centre(): BelongsTo
    {
        return $this->belongsTo(Centre::class);
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

public function attendances(): HasMany
{
    return $this->hasMany(Attendance::class);
}
}