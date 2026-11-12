<?php

namespace Tests\Feature\Auth;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProgrammeOfficerLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_programme_officer_can_log_in_and_open_their_dashboard(): void
    {
        $role = Role::create([
            'name' => 'Programme Officer',
        ]);

        $user = User::factory()->create([
            'role_id' => $role->id,
            'status' => 'active',
        ]);

        $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'password',
        ])->assertRedirect(route('dashboard', absolute: false));

        $this->get(route('dashboard'))
            ->assertRedirect(route('programme-officer.dashboard', absolute: false));

        $this->get(route('programme-officer.dashboard'))
            ->assertOk();
    }
}
