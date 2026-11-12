import { Head, Link } from "@inertiajs/react";
import {
    CalendarDays,
    ClipboardCheck,
    ClipboardList,
    Eye,
    GraduationCap,
    Percent,
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
import teacher from "@/routes/teacher";

interface LearningSession {
    id: number;
    class_group: string;
    topic: string;
    session_date: string;
    status: string;
    centre: {
        name: string;
    };
    subject: {
        name: string;
    };
}

interface TeacherDashboardProps {
    totalSessions: number;
    scheduledSessions: number;
    deliveredSessions: number;
    attendanceRate: number | null;
    assessmentRecords: number;
    sessions: {
        data: LearningSession[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}
export default function TeacherDashboard({
    totalSessions,
    scheduledSessions,
    deliveredSessions,
    attendanceRate,
    assessmentRecords,
    sessions,
}: TeacherDashboardProps) {
    const getStatusVariant = (status: string) => {
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
    };

    return (
        <>
            <Head title="Teacher Dashboard" />

            <div className="flex flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Teacher Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Welcome! Manage your assigned learning sessions and
                        classroom activities.
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Assigned Sessions
                            </CardTitle>
                            <CalendarDays className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalSessions}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Sessions assigned to you
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Scheduled Sessions
                            </CardTitle>
                            <CalendarDays className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {scheduledSessions}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Upcoming learning sessions
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Delivered Sessions
                            </CardTitle>
                            <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {deliveredSessions}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Completed learning sessions
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Attendance Rate
                            </CardTitle>
                            <Percent className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {attendanceRate === null
                                    ? "—"
                                    : `${attendanceRate}%`}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Present out of attendance recorded
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Assessment Records
                            </CardTitle>
                            <ClipboardList className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {assessmentRecords}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Learner-subject records updated by you
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Assigned Sessions */}
                <Card>
                    <CardHeader>
                        <CardTitle>My Learning Sessions</CardTitle>
                        <CardDescription>
                            Learning sessions assigned to you by the Admin.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {sessions.data.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left text-muted-foreground">
                                            <th className="p-3">Topic</th>
                                            <th className="p-3">Centre</th>
                                            <th className="p-3">Subject</th>
                                            <th className="p-3">Class</th>
                                            <th className="p-3">Date</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {sessions.data.map((session) => (
                                            <tr
                                                key={session.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="p-3 font-medium">
                                                    {session.topic}
                                                </td>
                                                <td className="p-3">
                                                    {session.centre.name}
                                                </td>
                                                <td className="p-3">
                                                    {session.subject.name}
                                                </td>
                                                <td className="p-3">
                                                    {session.class_group}
                                                </td>
                                                <td className="p-3">
                                                    {new Date(
                                                        session.session_date,
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="p-3">
                                                    <Badge
                                                        variant={getStatusVariant(
                                                            session.status,
                                                        )}
                                                    >
                                                        {session.status}
                                                    </Badge>
                                                </td>
                                                <td className="p-3">
                                                    <Button
                                                        asChild
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        <Link
                                                            href={teacher.sessions.show(
                                                                {
                                                                    learningSession:
                                                                        session.id,
                                                                },
                                                            )}
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View
                                                        </Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-10 text-center">
                                <GraduationCap className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                                <h3 className="font-semibold">
                                    No sessions assigned yet
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Your assigned learning sessions will appear
                                    here.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
