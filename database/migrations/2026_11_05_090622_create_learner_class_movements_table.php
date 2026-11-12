<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('learner_class_movements', function (Blueprint $table) {
    $table->id();

    $table->foreignId('learner_id')
        ->constrained('learners')
        ->restrictOnDelete();

    $table->enum('previous_class', ['Class A', 'Class B']);
    $table->enum('new_class', ['Class A', 'Class B']);

    $table->text('reason');

    $table->date('effective_date');

    $table->foreignId('recorded_by')
        ->constrained('users')
        ->restrictOnDelete();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('learner_class_movements');
    }
};
