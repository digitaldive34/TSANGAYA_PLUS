import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, UserRound } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    gender: string | null;
    qualification: string | null;
    photo: string | null;
    status: string;
    role: {
        name: string;
    } | null;
    centre: {
        name: string;
    } | null;
}

interface Props {
    user: User;
}

export default function UserShow({ user }: Props) {
    const details = [
        { label: 'Email address', value: user.email },
        { label: 'Phone number', value: user.phone },
        { label: 'Gender', value: user.gender },
        { label: 'Role', value: user.role?.name },
        { label: 'Assigned centre', value: user.centre?.name },
        { label: 'Qualification', value: user.qualification },
    ];

    return (
        <>
            <Head title={`${user.name} - User Details`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/users" aria-label="Back to users">
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            TSANGAYA+ / User Management
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight">
                            User Details
                        </h1>
                    </div>
                </div>

                <Card>
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            {user.photo ? (
                                <img
                                    src={`/storage/${user.photo}`}
                                    alt={`${user.name}'s profile`}
                                    className="size-16 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <UserRound className="size-8" />
                                </div>
                            )}

                            <div>
                                <h2 className="text-xl font-bold">
                                    {user.name}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {user.role?.name ?? 'No role assigned'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Badge
                                variant={
                                    user.status === 'active'
                                        ? 'default'
                                        : 'secondary'
                                }
                            >
                                {user.status}
                            </Badge>
                            <Button variant="outline" asChild>
                                <Link href={`/admin/users/${user.id}/edit`}>
                                    Edit User
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>
                            Contact details and staff assignment.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {details.map((detail) => (
                            <div key={detail.label} className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    {detail.label}
                                </p>
                                <p className="font-medium">
                                    {detail.value || 'Not provided'}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
