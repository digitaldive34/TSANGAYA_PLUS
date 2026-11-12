import { Head, Link } from "@inertiajs/react";
import { Plus, Pencil, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    role: {
        name: string;
    };
    centre: {
        name: string;
    } | null;
}

interface Props {
    users: {
        data: User[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

export default function UsersIndex({ users }: Props) {
    return (
        <>
            <Head title="User Management" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-3">
                            <Users className="h-6 w-6 text-primary" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                User Management
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Manage staff accounts and role assignments.
                            </p>
                        </div>
                    </div>

                    <Button asChild>
                        <Link href="/admin/users/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Staff Accounts</CardTitle>
                        <CardDescription>
                            View and manage registered system users.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {users.data.length === 0 ? (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No users have been registered yet.
                            </p>
                        ) : (
                            <div className="overflow-x-auto rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Centre</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {users.data.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">
                                                    {user.name}
                                                </TableCell>
                                                <TableCell>
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    {user.phone}
                                                </TableCell>
                                                <TableCell>
                                                    {user.role?.name}
                                                </TableCell>
                                                <TableCell>
                                                    {user.centre?.name ?? "—"}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={
                                                            user.status ===
                                                            "active"
                                                                ? "font-medium text-green-600"
                                                                : "font-medium text-destructive"
                                                        }
                                                    >
                                                        {user.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/users/${user.id}/edit`}
                                                        >
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                            {users.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={
                                        link.active ? "default" : "outline"
                                    }
                                    size="sm"
                                    disabled={!link.url}
                                    asChild={!!link.url}
                                >
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ) : (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    )}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
