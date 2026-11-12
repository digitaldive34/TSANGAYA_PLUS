<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('learners', function (Blueprint $table) {
            $table->id();

            $table->string('learner_code')->unique();
            $table->string('full_name');
            $table->unsignedTinyInteger('age')->nullable();

            $table->enum('class_group', ['Class A', 'Class B']);

            $table->foreignId('centre_id')
                ->constrained('centres')
                ->restrictOnDelete();

            $table->date('registration_date');

            $table->enum('status', ['active', 'inactive'])
                ->default('active');

            $table->foreignId('registered_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('learners');
    }
};