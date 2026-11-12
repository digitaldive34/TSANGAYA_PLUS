<?php

namespace Tests\Unit;

use App\Models\AssessmentRecord;
use PHPUnit\Framework\TestCase;

class AssessmentRecordTest extends TestCase
{
    public function test_final_percentage_averages_all_recorded_assessments(): void
    {
        $record = new AssessmentRecord([
            'baseline_score' => 60,
            'midline_score' => 75,
            'endline_score' => 90,
        ]);

        $this->assertSame(75.0, $record->final_percentage);
        $this->assertSame('A', $record->grade);
    }

    public function test_final_percentage_averages_only_scores_that_are_recorded(): void
    {
        $record = new AssessmentRecord([
            'baseline_score' => 0,
            'midline_score' => 100,
            'endline_score' => null,
        ]);

        $this->assertSame(50.0, $record->final_percentage);
    }

    public function test_final_percentage_is_null_when_no_scores_are_recorded(): void
    {
        $record = new AssessmentRecord([
            'baseline_score' => null,
            'midline_score' => null,
            'endline_score' => null,
        ]);

        $this->assertNull($record->final_percentage);
        $this->assertNull($record->grade);
    }
}
