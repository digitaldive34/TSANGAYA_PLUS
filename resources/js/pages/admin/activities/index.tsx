import { Head, Link } from "@inertiajs/react";
import {
    Activity as ActivityIcon,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { Button } from "@/components/ui/button";

interface ActivityUser {
    id: number;
    name: string;
}

interface Activity {
    id: number;
    user: ActivityUser | null;
    role: string | null;
    action: string;
    description: string;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedActivities {
    data: Activity[];
    links: PaginationLink[];
    total: number;
    current_page: number;
    last_page: number;
}

interface Props {
    activities: PaginatedActivities;
}

export default function ActivityIndex({ activities }: Props) {
    const formatAction = (action: string) => {
        return action
            .replaceAll(".", " ")
            .replaceAll("_", " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <>
            <Head title="Activity Monitoring" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                        <ActivityIcon className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Activity Monitoring
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Monitor activities performed across TSANGAYA+.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>System Activities</CardTitle>
                        <CardDescription>
                            A record of actions performed by Admins, Programme
                            Officers and Teachers.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground">
                                Total recorded activities
                            </p>
                            <p className="text-2xl font-bold">
                                {activities.total}
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {activities.data.length > 0 ? (
                                        activities.data.map((activity) => (
                                            <TableRow key={activity.id}>
                                                <TableCell className="font-medium">
                                                    {activity.user?.name ??
                                                        "Deleted User"}
                                                </TableCell>

                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {activity.role ??
                                                            "Unknown"}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell>
                                                    {formatAction(
                                                        activity.action,
                                                    )}
                                                </TableCell>

                                                <TableCell className="max-w-sm whitespace-normal">
                                                    {activity.description}
                                                </TableCell>

                                                <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                                                    {formatDate(
                                                        activity.created_at,
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={5}
                                                className="h-32 text-center text-muted-foreground"
                                            >
                                                No activities have been recorded
                                                yet.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {activities.last_page > 1 && (
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-sm text-muted-foreground">
                                    Page {activities.current_page} of{" "}
                                    {activities.last_page}
                                </p>

                                <div className="flex items-center gap-2">
                                    {activities.links.map((link, index) => {
                                        if (
                                            index === 0 ||
                                            index ===
                                                activities.links.length - 1
                                        ) {
                                            return link.url ? (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={link.url}>
                                                        {index === 0 ? (
                                                            <ChevronLeft className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4" />
                                                        )}
                                                    </Link>
                                                </Button>
                                            ) : null;
                                        }

                                        return (
                                            <Button
                                                key={index}
                                                variant={
                                                    link.active
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                disabled={!link.url}
                                                asChild={!!link.url}
                                            >
                                                {link.url ? (
                                                    <Link href={link.url}>
                                                        {link.label}
                                                    </Link>
                                                ) : (
                                                    <span>{link.label}</span>
                                                )}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
