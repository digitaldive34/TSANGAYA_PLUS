<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'role_id',
    'centre_id',
    'name',
    'email',
    'phone',
    'password',
    'status',
    'photo',
    'gender',
    'qualification',
])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
 public function role(): BelongsTo
{
    return $this->belongsTo(Role::class);
}

public function centre(): BelongsTo
{
    return $this->belongsTo(Centre::class);
}

public function registeredLearners(): HasMany
{
    return $this->hasMany(Learner::class, 'registered_by');
}

public function teachingSessions(): HasMany
{
    return $this->hasMany(LearningSession::class, 'teacher_id');
}

public function markedAttendances(): HasMany
{
    return $this->hasMany(Attendance::class, 'marked_by');
}

public function recordedAssessments(): HasMany
{
    return $this->hasMany(AssessmentRecord::class, 'recorded_by');
}

public function assessmentScoreChanges(): HasMany
{
    return $this->hasMany(AssessmentScoreHistory::class, 'changed_by');
}

public function recordedClassMovements(): HasMany
{
    return $this->hasMany(LearnerClassMovement::class, 'recorded_by');
}

public function recordedWelfareNeeds(): HasMany
{
    return $this->hasMany(WelfareNeed::class, 'recorded_by');
}

public function recordedWelfareSupports(): HasMany
{
    return $this->hasMany(WelfareSupport::class, 'recorded_by');
}

public function isAdmin(): bool
{
    return $this->role?->name === 'Admin';
}

public function isProgrammeOfficer(): bool
{
    return $this->role?->name === 'Programme Officer';
}

public function isTeacher(): bool
{
    return $this->role?->name === 'Teacher';
}

public function activities(): HasMany
{
    return $this->hasMany(Activity::class);
}
}
