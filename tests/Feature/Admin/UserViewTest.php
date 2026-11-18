<?php

namespace Tests\Feature\Admin;

use App\Models\Centre;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class UserViewTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_a_users_account_information(): void
    {
        $adminRole = Role::create(['name' => 'Admin']);
        $teacherRole = Role::create(['name' => 'Teacher']);
        $centre = Centre::create([
            'name' => 'Test Centre',
            'location' => 'Test Location',
        ]);
        $admin = User::factory()->create([
            'role_id' => $adminRole->id,
            'status' => 'active',
        ]);
        $teacher = User::factory()->create([
            'role_id' => $teacherRole->id,
            'centre_id' => $centre->id,
            'name' => 'Test Teacher',
            'email' => 'teacher@example.test',
            'phone' => '08000000000',
            'gender' => 'Female',
            'qualification' => 'NCE',
            'status' => 'active',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.users.show', $teacher))
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/users/show')
                ->where('user.id', $teacher->id)
                ->where('user.name', 'Test Teacher')
                ->where('user.email', 'teacher@example.test')
                ->where('user.phone', '08000000000')
                ->where('user.gender', 'Female')
                ->where('user.role.name', 'Teacher')
                ->where('user.centre.name', 'Test Centre')
                ->where('user.qualification', 'NCE')
                ->where('user.status', 'active'));
    }
}
