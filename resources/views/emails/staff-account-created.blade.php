<x-mail::message>
# Welcome to TSANGAYA+, {{ $user->name }}

An account has been created for you on TSANGAYA+.

**Email:** {{ $user->email }}  
**Role:** {{ $user->role?->name ?? 'Staff member' }}

Use the button below to open the application and sign in. Your password is not included in this email; please use the password provided to you securely by your administrator.

<x-mail::button :url="$loginUrl">
Open TSANGAYA+
</x-mail::button>

If you were not expecting this account, please contact your administrator.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
