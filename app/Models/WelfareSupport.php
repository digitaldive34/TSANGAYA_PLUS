<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WelfareSupport extends Model
{
    protected $fillable = [
        'welfare_need_id',
        'support_type',
        'description',
        'date_provided',
        'recorded_by',
        'notes',
    ];

    public function welfareNeed(): BelongsTo
    {
        return $this->belongsTo(WelfareNeed::class);
    }

    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}