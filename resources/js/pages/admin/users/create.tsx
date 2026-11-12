import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, UserPlus } from "lucide-react";
import { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Role {
    id: number;
    name: string;
}

interface Centre {
    id: number;
    name: string;
}

interface Props {
    roles: Role[];
    centres: Centre[];
}

export default function CreateUser({ roles, centres }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        gender: "",
        role_id: "",
        centre_id: "",
        qualification: "",
        password: "",
        password_confirmation: "",
        photo: null as File | null,
    });

    const selectedRole = roles.find((role) => String(role.id) === data.role_id);

    const isTeacher = selectedRole?.name === "Teacher";
    const needsCentre =
        selectedRole?.name === "Teacher" ||
        selectedRole?.name === "Programme Officer";

    const submit = (event: FormEvent) => {
        event.preventDefault();

        post("/admin/users", {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Add User" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/users">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Add Staff User
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Create a new account for a TSANGAYA+ staff member.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserPlus className="h-5 w-5" />
                                Personal Information
                            </CardTitle>
                            <CardDescription>
                                Enter the staff member's basic information.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="photo">
                                    Passport Photograph
                                </Label>
                                <Input
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        setData(
                                            "photo",
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                />
                                {errors.photo && (
                                    <p className="text-sm text-destructive">
                                        {errors.photo}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Optional. Maximum file size: 2MB.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Enter full name"
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">
                                    Gender (Optional)
                                </Label>
                                <Select
                                    value={data.gender || "none"}
                                    onValueChange={(value) =>
                                        setData(
                                            "gender",
                                            value === "none" ? "" : value,
                                        )
                                    }
                                >
                                    <SelectTrigger id="gender">
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
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Enter email address"
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
                                        setData("phone", e.target.value)
                                    }
                                    placeholder="Enter phone number"
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
                                Assign the staff member to their programme role
                                and centre.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select
                                    value={data.role_id}
                                    onValueChange={(value) => {
                                        setData((previous) => ({
                                            ...previous,
                                            role_id: value,
                                            centre_id: "",
                                            qualification: "",
                                        }));
                                    }}
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
                                            setData("centre_id", value)
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
                                                "qualification",
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
                            <CardTitle>Account Password</CardTitle>
                            <CardDescription>
                                Set the initial password for this staff account.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
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
                                    Confirm Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
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
                            {processing ? "Creating..." : "Create User"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
