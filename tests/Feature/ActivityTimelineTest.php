<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\Attendance;
use App\Models\Centre;
use App\Models\Learner;
use App\Models\LearningSession;
use App\Models\Role;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ActivityTimelineTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_all_staff_activity_in_the_activity_page(): void
    {
        $admin = $this->userWithRole('Admin');
        $teacher = $this->userWithRole('Teacher');
        $officer = $this->userWithRole('Programme Officer');

        $teacherActivity = $this->recordActivity(
            $teacher,
            'attendance.recorded',
            'Recorded attendance for Literacy.'
        );
        $this->recordActivity(
            $officer,
            'learner.registered',
            'Registered a learner.'
        );

        $this->actingAs($admin)
            ->get(route('admin.activities.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/activities/index')
                ->has('activities.data', 2)
                ->where('activities.data.0.id', $teacherActivity->id));
    }

    public function test_programme_officer_dashboard_and_timeline_only_show_teacher_activity(): void
    {
        $officer = $this->userWithRole('Programme Officer');
        $teacher = $this->userWithRole('Teacher');
        $admin = $this->userWithRole('Admin');

        $teacherActivity = $this->recordActivity(
            $teacher,
            'assessment.score_saved',
            'Saved an assessment score.'
        );
        $this->recordActivity(
            $admin,
            'centre.created',
            'Created a learning centre.'
        );

        $this->actingAs($officer)
            ->get(route('programme-officer.dashboard'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('recentTeacherActivities', 1)
                ->where('recentTeacherActivities.0.id', $teacherActivity->id));

        $this->actingAs($officer)
            ->get(route('programme-officer.monitoring.activities'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('programme-officer/monitoring/activities')
                ->has('activities.data', 1)
                ->where('activities.data.0.role', 'Teacher'));
    }

    public function test_marking_a_learning_session_delivered_is_logged_as_teacher_activity(): void
    {
        $teacher = $this->userWithRole('Teacher');
        $centre = Centre::create([
            'name' => 'Central Tsangaya',
            'location' => 'Kano',
            'status' => 'active',
        ]);
        $subject = Subject::create(['name' => 'Literacy']);
        $learner = Learner::create([
            'learner_code' => 'CENT-001',
            'full_name' => 'Amina Musa',
            'class_group' => 'Class A',
            'centre_id' => $centre->id,
            'registration_date' => now()->toDateString(),
            'registered_by' => $teacher->id,
            'status' => 'active',
        ]);
        $session = LearningSession::create([
            'centre_id' => $centre->id,
            'subject_id' => $subject->id,
            'teacher_id' => $teacher->id,
            'class_group' => 'Class A',
            'topic' => 'Reading practice',
            'session_date' => now()->toDateString(),
            'status' => 'Scheduled',
        ]);
        Attendance::create([
            'learning_session_id' => $session->id,
            'learner_id' => $learner->id,
            'status' => 'Present',
            'marked_by' => $teacher->id,
        ]);

        $this->actingAs($teacher)
            ->patch(route('teacher.sessions.delivered', $session))
            ->assertRedirect();

        $this->assertDatabaseHas('activities', [
            'user_id' => $teacher->id,
            'role' => 'Teacher',
            'action' => 'learning_session.delivered',
            'subject_type' => LearningSession::class,
            'subject_id' => $session->id,
        ]);
    }

    private function userWithRole(string $roleName): User
    {
        $role = Role::firstOrCreate(['name' => $roleName]);

        return User::factory()->create([
            'role_id' => $role->id,
            'status' => 'active',
        ]);
    }

    private function recordActivity(
        User $user,
        string $action,
        string $description
    ): Activity {
        return Activity::create([
            'user_id' => $user->id,
            'role' => $user->role->name,
            'action' => $action,
            'description' => $description,
        ]);
    }
}
