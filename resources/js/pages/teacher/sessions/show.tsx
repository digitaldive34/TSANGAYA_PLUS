import { Head, Link, router } from "@inertiajs/react";
import { useMemo, useState } from "react";
import {
    ArrowLeft,
    CalendarDays,
    ClipboardCheck,
    UserRound,
    CheckCircle,
} from "lucide-react";

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

import teacher from "@/routes/teacher";

interface LearningSession {
    id: number;
    class_group: string;
    topic: string;
    session_date: string;
    status: string;
    centre: {
        name: string;
        location: string;
    };
    subject: {
        name: string;
    };
    teacher: {
        name: string;
    };
    attendances: {
        id: number;
        status: string;
        learner: {
            full_name: string;
            learner_code: string;
        };
    }[];
}

interface SessionShowProps {
    session: LearningSession;
}

export default function TeacherSessionShow({ session }: SessionShowProps) {
    const [search, setSearch] = useState("");
    const [attendanceStatus, setAttendanceStatus] = useState("all");
    const filteredAttendance = useMemo(
        () =>
            session.attendances.filter((attendance) => {
                const matchesSearch =
                    `${attendance.learner.full_name} ${attendance.learner.learner_code}`
                        .toLowerCase()
                        .includes(search.toLowerCase());
                const matchesStatus =
                    attendanceStatus === "all" ||
                    attendance.status === attendanceStatus;
                return matchesSearch && matchesStatus;
            }),
        [session.attendances, search, attendanceStatus],
    );

    const statusVariant =
        session.status === "Delivered"
            ? "default"
            : session.status === "Cancelled"
              ? "destructive"
              : session.status === "Rescheduled"
                ? "secondary"
                : "outline";

    const hasAttendance = session.attendances.length > 0;

    return (
        <>
            <Head title={`Session: ${session.topic}`} />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={teacher.dashboard()}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Session Details
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                View your assigned learning session.
                            </p>
                        </div>
                    </div>

                    <Badge variant={statusVariant}>{session.status}</Badge>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{session.topic}</CardTitle>
                        <CardDescription>
                            Learning session #{session.id}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-6 sm:grid-cols-2">
                        <div className="flex items-start gap-3">
                            <CalendarDays className="mt-1 h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Session Date
                                </p>
                                <p className="font-medium">
                                    {new Date(
                                        session.session_date,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <ClipboardCheck className="mt-1 h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Subject
                                </p>
                                <p className="font-medium">
                                    {session.subject.name}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <UserRound className="mt-1 h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Learning Centre
                                </p>
                                <p className="font-medium">
                                    {session.centre.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {session.centre.location}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Class Group
                            </p>
                            <p className="font-medium">{session.class_group}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Assigned Teacher
                            </p>
                            <p className="font-medium">
                                {session.teacher.name}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Overview</CardTitle>
                        <CardDescription>
                            Attendance records for this learning session.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Showing {filteredAttendance.length} of{" "}
                                {session.attendances.length} attendance record(s).
                            </p>

                            {session.status === "Scheduled" && (
                                <div className="flex flex-wrap gap-2">
                                    <Button asChild>
                                        <Link
                                            href={teacher.sessions.attendance.create({
                                                learningSession: session.id,
                                            })}
                                        >
                                            <ClipboardCheck className="mr-2 h-4 w-4" />
                                            Record Attendance
                                        </Link>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        disabled={!hasAttendance}
                                        onClick={() =>
                                            router.patch(
                                                teacher.sessions.delivered({
                                                    learningSession: session.id,
                                                }).url,
                                            )
                                        }
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Mark as Delivered
                                    </Button>
                                </div>
                            )}
                        </div>

                        {session.attendances.length > 0 && (
                            <div className="mt-6">
                                <h3 className="mb-3 font-semibold">
                                    Learner Attendance
                                </h3>

                                <div className="mb-4">
                                    <DataTableFilters
                                        search={search}
                                        searchPlaceholder="Search learner name or code"
                                        onSearchChange={setSearch}
                                        filters={[
                                            {
                                                key: "attendance-status",
                                                label: "Attendance",
                                                value: attendanceStatus,
                                                onChange: setAttendanceStatus,
                                                options: [
                                                    { label: "All statuses", value: "all" },
                                                    { label: "Present", value: "Present" },
                                                    { label: "Absent", value: "Absent" },
                                                ],
                                            },
                                        ]}
                                    />
                                </div>

                                {filteredAttendance.length === 0 ? (
                                    <p className="py-6 text-center text-sm text-muted-foreground">
                                        No attendance records match the current search and filter.
                                    </p>
                                ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Learner Name</TableHead>
                                            <TableHead>Learner Code</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {filteredAttendance.map(
                                            (attendance) => (
                                                <TableRow key={attendance.id}>
                                                    <TableCell className="font-medium">
                                                        {
                                                            attendance.learner
                                                                .full_name
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            attendance.learner
                                                                .learner_code
                                                        }
                                                    </TableCell>

                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                attendance.status ===
                                                                "Present"
                                                                    ? "default"
                                                                    : "destructive"
                                                            }
                                                        >
                                                            {attendance.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
