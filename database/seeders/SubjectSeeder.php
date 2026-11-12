<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            [
                'name' => 'Literacy',
                'description' => 'Development of reading, writing and communication skills.',
            ],
            [
                'name' => 'Numeracy',
                'description' => 'Development of basic mathematical and problem-solving skills.',
            ],
            [
                'name' => 'Basic Modern Education',
                'description' => 'Development of essential knowledge and practical everyday skills.',
            ],
        ];

        foreach ($subjects as $subject) {
            Subject::updateOrCreate(
                ['name' => $subject['name']],
                [
                    'description' => $subject['description'],
                    'status' => 'active',
                ]
            );
        }
    }
}