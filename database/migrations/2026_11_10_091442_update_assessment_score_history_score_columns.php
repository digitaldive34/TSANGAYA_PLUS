<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('assessment_score_histories', function (Blueprint $table) {
            $table->decimal('old_score', 5, 2)->nullable()->change();
            $table->decimal('new_score', 5, 2)->change();
        });
    }

    public function down(): void
    {
        Schema::table('assessment_score_histories', function (Blueprint $table) {
            $table->unsignedTinyInteger('old_score')->nullable(false)->change();
            $table->unsignedTinyInteger('new_score')->change();
        });
    }
};