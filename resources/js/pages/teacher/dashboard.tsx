import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    CalendarDays,
    ClipboardCheck,
    ClipboardList,
    Eye,
    GraduationCap,
    Percent,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import teacher from '@/routes/teacher';
import DataTableFilters from '@/components/data-table-filters';
import DashboardStatCard from '@/components/dashboard-stat-card';

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
    scheduledSessions: number;
    deliveredSessions: number;
    attendanceRate: number | null;
    assessmentRecords: number;
    filters: {
        search: string;
        status: string;
    };
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
    scheduledSessions,
    deliveredSessions,
    attendanceRate,
    assessmentRecords,
    sessions,
    filters,
}: TeacherDashboardProps) {
    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status || 'all');
    const applyFilters = () =>
        router.get(
            '/teacher/dashboard',
            {
                search: search || undefined,
                status: status === 'all' ? undefined : status,
            },
            { preserveState: true, preserveScroll: true },
        );
    const clearFilters = () => {
        setSearch('');
        setStatus('all');
        router.get('/teacher/dashboard');
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Delivered':
                return 'default';
            case 'Cancelled':
                return 'destructive';
            case 'Rescheduled':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    return (
        <>
            <Head title="Teacher Dashboard" />

            <div className="flex flex-col gap-5 p-4 sm:p-5 lg:p-6">
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
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <DashboardStatCard
                        label="Scheduled"
                        value={scheduledSessions}
                        description="Upcoming learning sessions"
                        icon={CalendarDays}
                        tone="blue"
                    />
                    <DashboardStatCard
                        label="Delivered"
                        value={deliveredSessions}
                        description="Completed learning sessions"
                        icon={ClipboardCheck}
                        tone="teal"
                    />
                    <DashboardStatCard
                        label="Attendance Rate"
                        value={
                            attendanceRate === null ? '—' : `${attendanceRate}%`
                        }
                        description="Present out of recorded attendance"
                        icon={Percent}
                        tone="amber"
                    />
                    <DashboardStatCard
                        label="Assessment Records"
                        value={assessmentRecords}
                        description="Records updated by you"
                        icon={ClipboardList}
                        tone="violet"
                    />
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
                        <div className="mb-4">
                            <DataTableFilters
                                search={search}
                                searchPlaceholder="Search topic, centre, subject, or class"
                                onSearchChange={setSearch}
                                filters={[
                                    {
                                        key: 'status',
                                        label: 'Status',
                                        value: status,
                                        onChange: setStatus,
                                        options: [
                                            {
                                                label: 'All statuses',
                                                value: 'all',
                                            },
                                            {
                                                label: 'Scheduled',
                                                value: 'Scheduled',
                                            },
                                            {
                                                label: 'Delivered',
                                                value: 'Delivered',
                                            },
                                            {
                                                label: 'Cancelled',
                                                value: 'Cancelled',
                                            },
                                            {
                                                label: 'Rescheduled',
                                                value: 'Rescheduled',
                                            },
                                        ],
                                    },
                                ]}
                                onApply={applyFilters}
                                onClear={clearFilters}
                            />
                        </div>
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
                                    {search || status !== 'all'
                                        ? 'No matching sessions found'
                                        : 'No sessions assigned yet'}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {search || status !== 'all'
                                        ? 'Try adjusting your search or filters.'
                                        : 'Your assigned learning sessions will appear here.'}
                                </p>
                            </div>
                        )}
                        {sessions.links.length > 3 && (
                            <div className="mt-4 flex flex-wrap justify-end gap-2">
                                {sessions.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            link.active ? 'default' : 'outline'
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
                </Card>
            </div>
        </>
    );
}
