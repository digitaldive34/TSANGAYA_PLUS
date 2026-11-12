<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')
                ->after('id')
                ->constrained('roles')
                ->restrictOnDelete();

            $table->foreignId('centre_id')
                ->nullable()
                ->after('role_id')
                ->constrained('centres')
                ->restrictOnDelete();

            $table->string('phone')->nullable()->after('email');

            $table->enum('status', ['active', 'inactive'])
                ->default('active');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropForeign(['centre_id']);

            $table->dropColumn([
                'role_id',
                'centre_id',
                'phone',
                'status',
            ]);
        });
    }
};