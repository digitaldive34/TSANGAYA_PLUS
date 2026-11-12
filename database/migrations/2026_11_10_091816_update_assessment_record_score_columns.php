<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('assessment_records', function (Blueprint $table) {
            $table->decimal('baseline_score', 5, 2)->nullable()->change();
            $table->decimal('midline_score', 5, 2)->nullable()->change();
            $table->decimal('endline_score', 5, 2)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('assessment_records', function (Blueprint $table) {
            $table->unsignedTinyInteger('baseline_score')->nullable()->change();
            $table->unsignedTinyInteger('midline_score')->nullable()->change();
            $table->unsignedTinyInteger('endline_score')->nullable()->change();
        });
    }
};