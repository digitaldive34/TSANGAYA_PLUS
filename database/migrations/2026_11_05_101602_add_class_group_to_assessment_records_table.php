<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('assessment_records', function (Blueprint $table) {
            $table->enum('class_group', ['Class A', 'Class B'])
                ->after('subject_id');
        });
    }

    public function down(): void
    {
        Schema::table('assessment_records', function (Blueprint $table) {
            $table->dropColumn('class_group');
        });
    }
};