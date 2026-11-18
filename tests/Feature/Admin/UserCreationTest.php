<?php

namespace Tests\Feature\Admin;

use App\Mail\StaffAccountCreated;
use App\Models\Centre;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Mail\PendingMail;
use Illuminate\Support\Facades\Mail;
use Mockery;
use Symfony\Component\Mailer\Exception\TransportException;
use Tests\TestCase;

class UserCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_user_creation_sends_the_new_staff_member_a_login_link(): void
    {
        Mail::fake();

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

        $this->actingAs($admin)
            ->post(route('admin.users.store'), [
                'name' => 'New Teacher',
                'email' => 'teacher@example.test',
                'phone' => '08000000000',
                'role_id' => $teacherRole->id,
                'centre_id' => $centre->id,
                'qualification' => 'NCE',
                'password' => 'secure-password',
                'password_confirmation' => 'secure-password',
            ])
            ->assertRedirect(route('admin.users.index'));

        Mail::assertSent(StaffAccountCreated::class, function (StaffAccountCreated $mail) {
            $rendered = $mail->render();

            return $mail->hasTo('teacher@example.test')
                && str_contains($rendered, route('login'))
                && str_contains($rendered, 'teacher@example.test')
                && ! str_contains($rendered, 'secure-password');
        });
    }

    public function test_admin_is_notified_when_welcome_email_delivery_fails_after_account_creation(): void
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

        $pendingMail = Mockery::mock(PendingMail::class);
        $pendingMail->shouldReceive('send')
            ->once()
            ->with(Mockery::type(StaffAccountCreated::class))
            ->andThrow(new TransportException('SMTP authentication failed.'));

        Mail::shouldReceive('to')
            ->once()
            ->with('teacher@example.test')
            ->andReturn($pendingMail);

        $this->actingAs($admin)
            ->post(route('admin.users.store'), [
                'name' => 'New Teacher',
                'email' => 'teacher@example.test',
                'phone' => '08000000000',
                'role_id' => $teacherRole->id,
                'centre_id' => $centre->id,
                'qualification' => 'NCE',
                'password' => 'secure-password',
                'password_confirmation' => 'secure-password',
            ])
            ->assertRedirect(route('admin.users.index'))
            ->assertInertiaFlash('toast', [
                'type' => 'error',
                'message' => 'The account was created, but the welcome email could not be delivered. Check SMTP configuration.',
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'teacher@example.test',
        ]);
    }
}
