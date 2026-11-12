<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('welfare_needs', function (Blueprint $table) {
            $table->id();

            $table->foreignId('learner_id')
                ->constrained()
                ->restrictOnDelete();

            $table->enum('category', [
                'Clothing',
                'Health',
                'Learning Materials',
                'Other',
            ]);

            $table->text('description');

            $table->enum('status', [
                'Open',
                'In Progress',
                'Resolved',
            ])->default('Open');

            $table->date('identified_date');

            $table->foreignId('recorded_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('welfare_needs');
    }
};