import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Role {
    id: number;
    name: string;
}

interface Centre {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string | null;
    role_id: number;
    centre_id: number | null;
    qualification: string | null;
    photo: string | null;
    status: string;
    role: Role;
}

interface Props {
    user: User;
    roles: Role[];
    centres: Centre[];
}

export default function EditUser({ user, roles, centres }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender ?? '',
        role_id: String(user.role_id),
        centre_id: user.centre_id ? String(user.centre_id) : '',
        qualification: user.qualification ?? '',
        status: user.status,
        password: '',
        password_confirmation: '',
        photo: null as File | null,
    });

    const selectedRole = roles.find((role) => String(role.id) === data.role_id);

    const isTeacher = selectedRole?.name === 'Teacher';
    const needsCentre =
        selectedRole?.name === 'Teacher' ||
        selectedRole?.name === 'Programme Officer';

    const submit = (event: FormEvent) => {
        event.preventDefault();

        put(`/admin/users/${user.id}`, {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Edit User" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/users">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Edit Staff User
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Update staff information and account settings.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>
                                Update the staff member's personal details.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="photo">
                                    Passport Photograph
                                </Label>

                                {user.photo && (
                                    <img
                                        src={`/storage/${user.photo}`}
                                        alt="Current passport photograph"
                                        className="h-24 w-24 rounded-lg border object-cover"
                                    />
                                )}

                                <Input
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        setData(
                                            'photo',
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                />

                                {errors.photo && (
                                    <p className="text-sm text-destructive">
                                        {errors.photo}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Gender (Optional)</Label>
                                <Select
                                    value={data.gender || 'none'}
                                    onValueChange={(value) =>
                                        setData(
                                            'gender',
                                            value === 'none' ? '' : value,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            Not specified
                                        </SelectItem>
                                        <SelectItem value="Male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="Female">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.gender && (
                                    <p className="text-sm text-destructive">
                                        {errors.gender}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                />
                                {errors.phone && (
                                    <p className="text-sm text-destructive">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Role and Assignment</CardTitle>
                            <CardDescription>
                                Update the staff member's role and centre.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select
                                    value={data.role_id}
                                    onValueChange={(value) =>
                                        setData((previous) => ({
                                            ...previous,
                                            role_id: value,
                                            centre_id: '',
                                            qualification: '',
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((role) => (
                                            <SelectItem
                                                key={role.id}
                                                value={String(role.id)}
                                            >
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.role_id && (
                                    <p className="text-sm text-destructive">
                                        {errors.role_id}
                                    </p>
                                )}
                            </div>

                            {needsCentre && (
                                <div className="space-y-2">
                                    <Label>Assigned Centre</Label>
                                    <Select
                                        value={data.centre_id}
                                        onValueChange={(value) =>
                                            setData('centre_id', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select centre" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {centres.map((centre) => (
                                                <SelectItem
                                                    key={centre.id}
                                                    value={String(centre.id)}
                                                >
                                                    {centre.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.centre_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.centre_id}
                                        </p>
                                    )}
                                </div>
                            )}

                            {isTeacher && (
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="qualification">
                                        Qualification
                                    </Label>
                                    <Input
                                        id="qualification"
                                        value={data.qualification}
                                        onChange={(e) =>
                                            setData(
                                                'qualification',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. NCE, B.Ed., B.Sc."
                                    />
                                    {errors.qualification && (
                                        <p className="text-sm text-destructive">
                                            {errors.qualification}
                                        </p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>
                                Manage account status and password.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Account Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData('status', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            Inactive
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-destructive">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div />

                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    New Password (Optional)
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                                {errors.password && (
                                    <p className="text-sm text-destructive">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm New Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-3">
                        <Button variant="outline" asChild>
                            <Link href="/admin/users">Cancel</Link>
                        </Button>

                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
