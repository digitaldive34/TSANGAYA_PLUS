<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();

            $table->foreignId('learning_session_id')
                ->constrained('learning_sessions')
                ->restrictOnDelete();

            $table->foreignId('learner_id')
                ->constrained('learners')
                ->restrictOnDelete();

            $table->enum('status', ['Present', 'Absent']);

            $table->foreignId('marked_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamps();

            $table->unique(['learning_session_id', 'learner_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};