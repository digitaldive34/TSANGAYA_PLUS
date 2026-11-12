<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Learner extends Model
{
    protected $fillable = [
        'learner_code',
        'full_name',
        'age',
        'class_group',
        'centre_id',
        'registration_date',
        'status',
        'registered_by',
        'consent_status',
        'consent_date',
        'consent_recorded_by',
    ];

    public function centre(): BelongsTo
    {
        return $this->belongsTo(Centre::class);
    }

    public function registeredBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'registered_by');
    }

public function attendances(): HasMany
{
    return $this->hasMany(Attendance::class);
}

public function assessmentRecords(): HasMany
{
    return $this->hasMany(AssessmentRecord::class);
}

public function classMovements(): HasMany
{
    return $this->hasMany(LearnerClassMovement::class);
}

public function welfareNeeds(): HasMany
{
    return $this->hasMany(WelfareNeed::class);
}
}