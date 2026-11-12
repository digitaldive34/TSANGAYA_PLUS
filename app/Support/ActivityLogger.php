<?php

namespace App\Support;

use App\Models\Activity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ActivityLogger
{
    public static function log(
        string $action,
        string $description,
        ?Model $subject = null
    ): void {
        $user = Auth::user();

        Activity::create([
            'user_id' => $user?->id,
            'role' => $user?->role?->name,
            'action' => $action,
            'subject_type' => $subject ? get_class($subject) : null,
            'subject_id' => $subject?->getKey(),
            'description' => $description,
        ]);
    }
}
