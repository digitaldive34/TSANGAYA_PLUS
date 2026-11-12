<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('welfare_supports', function (Blueprint $table) {
            $table->id();

            $table->foreignId('welfare_need_id')
                ->constrained()
                ->restrictOnDelete();

            $table->enum('support_type', [
                'Financial Assistance',
                'Material Assistance',
                'Referral',
                'Other',
            ]);

            $table->text('description');

            $table->date('date_provided');

            $table->foreignId('recorded_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('welfare_supports');
    }
};