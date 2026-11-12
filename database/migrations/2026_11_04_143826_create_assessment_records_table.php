<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessment_records', function (Blueprint $table) {
            $table->id();

            $table->foreignId('learner_id')
                ->constrained()
                ->restrictOnDelete();

            $table->foreignId('subject_id')
                ->constrained()
                ->restrictOnDelete();

            $table->unsignedTinyInteger('baseline_score')->nullable();
            $table->unsignedTinyInteger('midline_score')->nullable();
            $table->unsignedTinyInteger('endline_score')->nullable();

            $table->foreignId('recorded_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamps();

            $table->unique(['learner_id', 'subject_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_records');
    }
};