<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('learning_sessions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('centre_id')
                ->constrained('centres')
                ->restrictOnDelete();

            $table->foreignId('subject_id')
                ->constrained('subjects')
                ->restrictOnDelete();

            $table->foreignId('teacher_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->enum('class_group', ['Class A', 'Class B']);

            $table->string('topic');

            $table->date('session_date');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('learning_sessions');
    }
};