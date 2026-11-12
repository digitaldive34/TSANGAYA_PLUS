<?php

namespace Tests\Feature;

use App\Models\AssessmentRecord;
use App\Models\Attendance;
use App\Models\Centre;
use App\Models\Learner;
use App\Models\LearningSession;
use App\Models\Role;
use App\Models\Subject;
use App\Models\User;
use App\Models\WelfareNeed;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardStatisticsTest extends TestCase
{
    use RefreshDatabase;

    public function test_each_dashboard_shows_current_role_specific_statistics(): void
    {
        $adminRole = Role::create(['name' => 'Admin']);
        $programmeOfficerRole = Role::create(['name' => 'Programme Officer']);
        $teacherRole = Role::create(['name' => 'Teacher']);

        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
            'status' => 'active',
        ]);
        $programmeOfficer = User::factory()->create([
            'role_id' => $programmeOfficerRole->id,
            'status' => 'active',
        ]);
        $teacher = User::factory()->create([
            'role_id' => $teacherRole->id,
            'status' => 'active',
        ]);

        $centre = Centre::create([
            'name' => 'Test Centre',
            'location' => 'Test Location',
        ]);
        $subject = Subject::create(['name' => 'Literacy']);
        $learner = Learner::create([
            'learner_code' => 'TEST-001',
            'full_name' => 'Test Learner',
            'class_group' => 'Class A',
            'centre_id' => $centre->id,
            'registration_date' => now()->toDateString(),
            'registered_by' => $programmeOfficer->id,
            'status' => 'active',
        ]);

        $scheduledSession = LearningSession::create([
            'centre_id' => $centre->id,
            'subject_id' => $subject->id,
            'teacher_id' => $teacher->id,
            'class_group' => 'Class A',
            'topic' => 'Reading',
            'session_date' => now()->toDateString(),
            'status' => 'Scheduled',
        ]);
        $deliveredSession = LearningSession::create([
            'centre_id' => $centre->id,
            'subject_id' => $subject->id,
            'teacher_id' => $teacher->id,
            'class_group' => 'Class A',
            'topic' => 'Writing',
            'session_date' => now()->toDateString(),
            'status' => 'Delivered',
        ]);

        Attendance::create([
            'learning_session_id' => $scheduledSession->id,
            'learner_id' => $learner->id,
            'status' => 'Present',
            'marked_by' => $teacher->id,
        ]);
        Attendance::create([
            'learning_session_id' => $deliveredSession->id,
            'learner_id' => $learner->id,
            'status' => 'Absent',
            'marked_by' => $teacher->id,
        ]);
        AssessmentRecord::create([
            'learner_id' => $learner->id,
            'subject_id' => $subject->id,
            'class_group' => 'Class A',
            'baseline_score' => 80,
            'recorded_by' => $teacher->id,
        ]);

        foreach (['Open', 'Resolved'] as $status) {
            WelfareNeed::create([
                'learner_id' => $learner->id,
                'category' => 'Health',
                'description' => "{$status} welfare need",
                'status' => $status,
                'identified_date' => now()->toDateString(),
                'recorded_by' => $programmeOfficer->id,
            ]);
        }

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('totalLearners', 1)
                ->where('activeLearners', 1)
                ->where('scheduledSessions', 1)
                ->where('deliveredSessions', 1));

        $this->actingAs($programmeOfficer)
            ->get(route('programme-officer.dashboard'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('totalLearners', 1)
                ->where('newLearnersThisMonth', 1)
                ->where('openWelfareNeeds', 1)
                ->where('resolvedWelfareNeeds', 1));

        $this->actingAs($teacher)
            ->get(route('teacher.dashboard'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('totalSessions', 2)
                ->where('scheduledSessions', 1)
                ->where('deliveredSessions', 1)
                ->where('attendanceRate', 50)
                ->where('assessmentRecords', 1));
    }

    public function test_teacher_attendance_rate_is_unavailable_without_records(): void
    {
        $teacherRole = Role::create(['name' => 'Teacher']);
        $teacher = User::factory()->create([
            'role_id' => $teacherRole->id,
            'status' => 'active',
        ]);

        $this->actingAs($teacher)
            ->get(route('teacher.dashboard'))
            ->assertInertia(fn (Assert $page) => $page
                ->where('attendanceRate', null));
    }
}
