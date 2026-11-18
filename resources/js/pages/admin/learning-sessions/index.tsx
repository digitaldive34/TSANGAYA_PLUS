import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { CalendarDays, Eye, Pencil, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import DataTableFilters from "@/components/data-table-filters";

interface LearningSession {
    id: number;
    class_group: string;
    topic: string;
    session_date: string;
    status: "Scheduled" | "Delivered" | "Cancelled" | "Rescheduled";
    centre: {
        id: number;
        name: string;
    };
    subject: {
        id: number;
        name: string;
    };
    teacher: {
        id: number;
        name: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface LearningSessionsProps {
    filters: {
        search: string;
        status: string;
        class_group: string;
    };
    sessions: {
        data: LearningSession[];
        links: PaginationLink[];
        total: number;
    };
}

function getStatusVariant(status: LearningSession["status"]) {
    switch (status) {
        case "Delivered":
            return "default";
        case "Cancelled":
            return "destructive";
        case "Rescheduled":
            return "secondary";
        default:
            return "outline";
    }
}

export default function LearningSessionsIndex({
    sessions,
    filters,
}: LearningSessionsProps) {
    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status || "all");
    const [classGroup, setClassGroup] = useState(filters.class_group || "all");
    const applyFilters = () =>
        router.get(
            "/admin/learning-sessions",
            {
                search: search || undefined,
                status: status === "all" ? undefined : status,
                class_group: classGroup === "all" ? undefined : classGroup,
            },
            { preserveState: true, preserveScroll: true },
        );
    const clearFilters = () => {
        setSearch("");
        setStatus("all");
        setClassGroup("all");
        router.get("/admin/learning-sessions");
    };

    return (
        <>
            <Head title="Learning Sessions" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Learning Sessions
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Create and manage learning sessions across Tsangaya
                            centres.
                        </p>
                    </div>

                    <Button asChild>
                        <Link href="/admin/learning-sessions/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Session
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Learning Sessions</CardTitle>
                        <CardDescription>
                            A total of {sessions.total} learning sessions
                            recorded.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <DataTableFilters
                            search={search}
                            searchPlaceholder="Search topic, centre, subject, or teacher"
                            onSearchChange={setSearch}
                            filters={[
                                {
                                    key: "status",
                                    label: "Status",
                                    value: status,
                                    onChange: setStatus,
                                    options: [
                                        { label: "All statuses", value: "all" },
                                        { label: "Scheduled", value: "Scheduled" },
                                        { label: "Delivered", value: "Delivered" },
                                        { label: "Cancelled", value: "Cancelled" },
                                        { label: "Rescheduled", value: "Rescheduled" },
                                    ],
                                },
                                {
                                    key: "class",
                                    label: "Class",
                                    value: classGroup,
                                    onChange: setClassGroup,
                                    options: [
                                        { label: "All classes", value: "all" },
                                        { label: "Class A", value: "Class A" },
                                        { label: "Class B", value: "Class B" },
                                    ],
                                },
                            ]}
                            onApply={applyFilters}
                            onClear={clearFilters}
                        />
                        {
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Topic</TableHead>
                                            <TableHead>Centre</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Teacher</TableHead>
                                            <TableHead>Class</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {sessions.data.length > 0 ? (
                                            sessions.data.map((session) => (
                                                <TableRow key={session.id}>
                                                    <TableCell className="font-medium">
                                                        {session.topic}
                                                    </TableCell>

                                                    <TableCell>
                                                        {session.centre.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {session.subject.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {session.teacher.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {session.class_group}
                                                    </TableCell>

                                                    <TableCell>
                                                        {new Date(
                                                            session.session_date,
                                                        ).toLocaleDateString()}
                                                    </TableCell>

                                                    <TableCell>
                                                        <Badge
                                                            variant={getStatusVariant(
                                                                session.status,
                                                            )}
                                                        >
                                                            {session.status}
                                                        </Badge>
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={`/admin/learning-sessions/${session.id}`}
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Link>
                                                            </Button>

                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={`/admin/learning-sessions/${session.id}/edit`}
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={8}
                                                    className="h-24 text-center"
                                                >
                                                    No learning sessions have
                                                    been created yet.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                {sessions.links.length > 3 && (
                                    <div className="mt-4 flex flex-wrap justify-end gap-2">
                                        {sessions.links.map((link, index) => (
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
                                                    <Link
                                                        href={link.url}
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                        preserveScroll
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
                                )}
                            </CardContent>
                        }
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
