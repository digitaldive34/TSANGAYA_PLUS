<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class StaffAccountCreated extends Mailable
{
    use Queueable, SerializesModels;

    public string $loginUrl;

    public function __construct(public User $user)
    {
        $this->loginUrl = route('login');
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your TSANGAYA+ account is ready',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.staff-account-created',
        );
    }
}
