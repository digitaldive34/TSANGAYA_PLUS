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
        Schema::table('learners', function (Blueprint $table) {
    $table->enum('consent_status', ['Pending', 'Granted', 'Declined'])
        ->default('Pending');

    $table->date('consent_date')->nullable();

    $table->foreignId('consent_recorded_by')
        ->nullable()
        ->constrained('users')
        ->restrictOnDelete();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('learners', function (Blueprint $table) {
    $table->dropForeign(['consent_recorded_by']);
    $table->dropColumn([
        'consent_status',
        'consent_date',
        'consent_recorded_by',
    ]);
});
    }
};
