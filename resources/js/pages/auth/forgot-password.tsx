import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            {status && (
                <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <div className="rounded-lg border border-amber-100 bg-amber-50/70 p-4">
                    <p className="text-sm leading-6 text-slate-600">
                        Forgot your password? Enter the email address associated
                        with your staff account. If it exists, we will send you
                        a link to reset your password.
                    </p>
                </div>

                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <div className="space-y-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    required
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                                data-test="email-password-reset-link-button"
                            >
                                {processing && (
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Email password reset link
                            </Button>
                        </div>
                    )}
                </Form>

                <div className="border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
                    <span>Remembered your password? </span>
                    <TextLink
                        href={login()}
                        className="font-semibold text-amber-700 hover:text-amber-800"
                    >
                        Log in
                    </TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Reset your password',
    description: 'Recover access to your TSANGAYA+ staff account',
};
