<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Centre extends Model
{
    protected $fillable = [
        'name',
        'location',
        'learner_population',
        'internet_availability',
        'electricity_availability',
        'technology_readiness',
        'status',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
  
public function learners(): HasMany
{
    return $this->hasMany(Learner::class);
}

public function learningSessions(): HasMany
{
    return $this->hasMany(LearningSession::class);
}
}