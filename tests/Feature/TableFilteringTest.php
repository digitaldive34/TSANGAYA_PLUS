<?php

namespace Tests\Feature;

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

class TableFilteringTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_search_centres_and_filter_by_status(): void
    {
        $adminRole = Role::create(['name' => 'Admin']);
        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
            'status' => 'active',
        ]);
        Centre::create([
            'name' => 'North Learning Centre',
            'location' => 'Kano',
            'status' => 'active',
        ]);
        Centre::create([
            'name' => 'South Learning Centre',
            'location' => 'Kano',
            'status' => 'inactive',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.centres.index', [
                'search' => 'North',
                'status' => 'active',
            ]))
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/centres/index')
                ->has('centres.data', 1)
                ->where('centres.data.0.name', 'North Learning Centre')
                ->where('filters.search', 'North')
                ->where('filters.status', 'active'));
    }

    public function test_programme_officer_can_search_learners_and_welfare_records(): void
    {
        $officerRole = Role::create(['name' => 'Programme Officer']);
        $officer = User::factory()->create([
            'role_id' => $officerRole->id,
            'status' => 'active',
        ]);
        $centre = Centre::create([
            'name' => 'Central Tsangaya',
            'location' => 'Kano',
            'status' => 'active',
        ]);
        $learner = Learner::create([
            'learner_code' => 'CENT-001',
            'full_name' => 'Amina Musa',
            'class_group' => 'Class A',
            'centre_id' => $centre->id,
            'registration_date' => now()->toDateString(),
            'registered_by' => $officer->id,
            'status' => 'active',
        ]);
        WelfareNeed::create([
            'learner_id' => $learner->id,
            'category' => 'Health',
            'description' => 'Needs a health check',
            'status' => 'Open',
            'identified_date' => now()->toDateString(),
            'recorded_by' => $officer->id,
        ]);

        $this->actingAs($officer)
            ->get(route('programme-officer.learners.index', [
                'search' => 'CENT-001',
                'class_group' => 'Class A',
                'status' => 'active',
            ]))
            ->assertInertia(fn (Assert $page) => $page
                ->component('programme-officer/learners/index')
                ->has('learners.data', 1)
                ->where('learners.data.0.learner_code', 'CENT-001'));

        $this->actingAs($officer)
            ->get(route('programme-officer.welfare.index', [
                'search' => 'Amina',
                'category' => 'Health',
                'status' => 'Open',
            ]))
            ->assertInertia(fn (Assert $page) => $page
                ->component('programme-officer/welfare/index')
                ->has('welfareNeeds.data', 1)
                ->where('welfareNeeds.data.0.learner.full_name', 'Amina Musa'));
    }

    public function test_teacher_can_search_and_filter_assigned_sessions(): void
    {
        $teacherRole = Role::create(['name' => 'Teacher']);
        $teacher = User::factory()->create([
            'role_id' => $teacherRole->id,
            'status' => 'active',
        ]);
        $centre = Centre::create([
            'name' => 'West Learning Centre',
            'location' => 'Kano',
            'status' => 'active',
        ]);
        $subject = Subject::create(['name' => 'Literacy']);

        LearningSession::create([
            'centre_id' => $centre->id,
            'subject_id' => $subject->id,
            'teacher_id' => $teacher->id,
            'class_group' => 'Class A',
            'topic' => 'Reading skills',
            'session_date' => now()->toDateString(),
            'status' => 'Scheduled',
        ]);
        LearningSession::create([
            'centre_id' => $centre->id,
            'subject_id' => $subject->id,
            'teacher_id' => $teacher->id,
            'class_group' => 'Class A',
            'topic' => 'Writing skills',
            'session_date' => now()->toDateString(),
            'status' => 'Delivered',
        ]);

        $this->actingAs($teacher)
            ->get(route('teacher.dashboard', [
                'search' => 'Reading',
                'status' => 'Scheduled',
            ]))
            ->assertInertia(fn (Assert $page) => $page
                ->component('teacher/dashboard')
                ->has('sessions.data', 1)
                ->where('sessions.data.0.topic', 'Reading skills')
                ->where('filters.search', 'Reading')
                ->where('filters.status', 'Scheduled'));
    }
}
