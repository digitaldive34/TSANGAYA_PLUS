<?php

namespace Tests\Feature\Admin;

use App\Models\Centre;
use App\Models\LearningSession;
use App\Models\Role;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LearningSessionCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_an_admin_can_create_a_learning_session_with_a_topic(): void
    {
        $adminRole = Role::create(['name' => 'Admin']);
        $teacherRole = Role::create(['name' => 'Teacher']);
        $centre = Centre::create([
            'name' => 'Test Centre',
            'location' => 'Test Location',
        ]);
        $subject = Subject::create(['name' => 'Literacy']);

        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
            'status' => 'active',
        ]);
        $teacher = User::factory()->create([
            'role_id' => $teacherRole->id,
            'centre_id' => $centre->id,
            'status' => 'active',
        ]);

        $this->actingAs($admin)
            ->post(route('admin.learning-sessions.store'), [
                'centre_id' => $centre->id,
                'subject_id' => $subject->id,
                'teacher_id' => $teacher->id,
                'class_group' => 'Class A',
                'topic' => 'Reading basics',
                'session_date' => '2026-11-12',
            ])
            ->assertRedirect(route('admin.learning-sessions.index'));

        $this->assertDatabaseHas('learning_sessions', [
            'centre_id' => $centre->id,
            'subject_id' => $subject->id,
            'teacher_id' => $teacher->id,
            'topic' => 'Reading basics',
            'status' => 'Scheduled',
        ]);
    }

    public function test_a_learning_session_requires_a_topic(): void
    {
        $adminRole = Role::create(['name' => 'Admin']);
        $teacherRole = Role::create(['name' => 'Teacher']);
        $centre = Centre::create([
            'name' => 'Test Centre',
            'location' => 'Test Location',
        ]);
        $subject = Subject::create(['name' => 'Literacy']);
        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
            'status' => 'active',
        ]);
        $teacher = User::factory()->create([
            'role_id' => $teacherRole->id,
            'centre_id' => $centre->id,
            'status' => 'active',
        ]);

        $this->actingAs($admin)
            ->from(route('admin.learning-sessions.create'))
            ->post(route('admin.learning-sessions.store'), [
                'centre_id' => $centre->id,
                'subject_id' => $subject->id,
                'teacher_id' => $teacher->id,
                'class_group' => 'Class A',
                'topic' => '',
                'session_date' => '2026-11-12',
            ])
            ->assertSessionHasErrors('topic');

        $this->assertSame(0, LearningSession::count());
    }
}
