<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'name' => 'Admin',
                'description' => 'Manages the entire TSANGAYA+ system.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Programme Officer',
                'description' => 'Manages learner registration and welfare records.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Teacher',
                'description' => 'Manages assigned learning sessions, attendance and assessments.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}