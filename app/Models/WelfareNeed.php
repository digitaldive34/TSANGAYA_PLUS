<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WelfareNeed extends Model
{
    protected $fillable = [
        'learner_id',
        'category',
        'description',
        'status',
        'identified_date',
        'recorded_by',
    ];

    public function learner(): BelongsTo
    {
        return $this->belongsTo(Learner::class);
    }

    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    public function supports(): HasMany
{
    return $this->hasMany(WelfareSupport::class);
}
}