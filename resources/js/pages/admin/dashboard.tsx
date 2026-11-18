import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Plus,
    Users,
    GraduationCap,
    Building2,
    CalendarDays,
    ClipboardCheck,
    UserPlus,
} from 'lucide-react';
import DashboardStatCard from '@/components/dashboard-stat-card';
import ActivityTimeline, {
    type ActivityEntry,
} from '@/components/activity-timeline';

interface AdminDashboardProps {
    totalLearners: number;
    activeCentres: number;
    staffMembers: number;
    scheduledSessions: number;
    deliveredSessions: number;
    recentActivities: ActivityEntry[];
}

export default function AdminDashboard({
    totalLearners,
    activeCentres,
    staffMembers,
    scheduledSessions,
    deliveredSessions,
    recentActivities,
}: AdminDashboardProps) {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen space-y-5 p-4 sm:p-5 lg:p-6">
                {/* Welcome Section */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <p className="font-small py-3 text-xs text-slate-500">
                            TSANGAYA+ / Administration
                        </p>

                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                            Welcome back, Admin
                        </h1>

                        <p className="text-sm text-slate-500">
                            Here's an overview of your programme today.
                        </p>
                    </div>
                </div>

                {/* Programme Statistics */}
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                    <DashboardStatCard
                        label="Total Learners"
                        value={totalLearners}
                        description="Registered across centres"
                        icon={GraduationCap}
                        tone="blue"
                    />
                    <DashboardStatCard
                        label="Active Centres"
                        value={activeCentres}
                        description="Currently operating"
                        icon={Building2}
                        tone="teal"
                    />
                    <DashboardStatCard
                        label="Staff Members"
                        value={staffMembers}
                        description="Across all roles"
                        icon={Users}
                        tone="navy"
                    />
                    <DashboardStatCard
                        label="Scheduled Sessions"
                        value={scheduledSessions}
                        description="Planned learning sessions"
                        icon={CalendarDays}
                        tone="amber"
                    />
                    <DashboardStatCard
                        label="Delivered Sessions"
                        value={deliveredSessions}
                        description="Completed learning sessions"
                        icon={ClipboardCheck}
                        tone="violet"
                    />
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Quick Actions
                        </h2>
                        <p className="text-sm text-slate-500">
                            Manage your programme from one place.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="transition-shadow hover:shadow-md">
                            <CardContent className="flex items-center justify-between p-5">
                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        Add Staff Member
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Create an account for a staff member.
                                    </p>
                                </div>

                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() =>
                                        router.visit('/admin/users/create')
                                    }
                                >
                                    <UserPlus className="size-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="transition-shadow hover:shadow-md">
                            <CardContent className="flex items-center justify-between p-5">
                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        Manage Staff
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        View and update staff accounts.
                                    </p>
                                </div>

                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => router.visit('/admin/users')}
                                >
                                    <Users className="size-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="transition-shadow hover:shadow-md">
                            <CardContent className="flex items-center justify-between p-5">
                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        Add Centre
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Register a new Tsangaya centre.
                                    </p>
                                </div>

                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() =>
                                        router.visit('/admin/centres/create')
                                    }
                                >
                                    <Plus className="size-4" />
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="transition-shadow hover:shadow-md">
                            <CardContent className="flex items-center justify-between p-5">
                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        Create Learning Session
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Schedule a session for a teacher.
                                    </p>
                                </div>

                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() =>
                                        router.visit(
                                            '/admin/learning-sessions/create',
                                        )
                                    }
                                >
                                    <Plus className="size-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Recent Activities */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-lg">
                                Recent Activities
                            </CardTitle>
                            <p className="mt-1 text-sm text-slate-500">
                                A timeline of recent actions by all staff.
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.visit('/admin/activities')}
                        >
                            View All
                        </Button>
                    </CardHeader>

                    <CardContent>
                        <ActivityTimeline
                            activities={recentActivities}
                            emptyMessage="Staff actions will appear here as they use the platform."
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
