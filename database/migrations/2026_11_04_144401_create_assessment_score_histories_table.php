<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessment_score_histories', function (Blueprint $table) {
            $table->id();

            $table->foreignId('assessment_record_id')
                ->constrained('assessment_records')
                ->restrictOnDelete();

            $table->enum('assessment_type', [
                'Baseline',
                'Midline',
                'Endline',
            ]);

            $table->unsignedTinyInteger('old_score');
            $table->unsignedTinyInteger('new_score');

            $table->foreignId('changed_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_score_histories');
    }
};