import { Head, Link } from '@inertiajs/react';
import {
    GraduationCap,
    HeartHandshake,
    CalendarDays,
    CalendarPlus,
    UserPlus,
    ClipboardList,
    ArrowRight,
    BadgeCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import programmeOfficer from '@/routes/programme-officer';
import DashboardStatCard from '@/components/dashboard-stat-card';
import ActivityTimeline, {
    type ActivityEntry,
} from '@/components/activity-timeline';

interface DashboardProps {
    totalLearners: number;
    newLearnersThisMonth: number;
    openWelfareNeeds: number;
    resolvedWelfareNeeds: number;
    recentTeacherActivities: ActivityEntry[];
}

export default function Dashboard({
    totalLearners,
    newLearnersThisMonth,
    openWelfareNeeds,
    resolvedWelfareNeeds,
    recentTeacherActivities,
}: DashboardProps) {
    const stats = [
        {
            title: 'Total Learners',
            value: totalLearners,
            icon: GraduationCap,
            description: 'Registered learners',
        },
        {
            title: 'New This Month',
            value: newLearnersThisMonth,
            icon: CalendarPlus,
            description: 'Learners registered this month',
            tone: 'blue' as const,
        },
        {
            title: 'Open Welfare Needs',
            value: openWelfareNeeds,
            icon: HeartHandshake,
            description: 'Awaiting resolution',
            tone: 'amber' as const,
        },
        {
            title: 'Resolved Welfare Needs',
            value: resolvedWelfareNeeds,
            icon: BadgeCheck,
            description: 'Needs marked resolved',
            tone: 'teal' as const,
        },
    ] as const;

    const quickActions = [
        {
            title: 'Register Learner',
            description: 'Add a new learner to a Tsangaya centre.',
            href: programmeOfficer.learners.create(),
            icon: UserPlus,
        },
        {
            title: 'Manage Learners',
            description: 'View and manage registered learners.',
            href: programmeOfficer.learners.index(),
            icon: GraduationCap,
        },
        {
            title: 'Record Welfare Need',
            description: 'Document a learner welfare concern.',
            href: programmeOfficer.welfare.create(),
            icon: HeartHandshake,
        },
        {
            title: 'View Welfare Records',
            description: 'Review welfare needs and support records.',
            href: programmeOfficer.welfare.index(),
            icon: ClipboardList,
        },
    ];

    return (
        <>
            <Head title="Programme Officer Dashboard" />

            <div className="space-y-6 p-4 sm:p-5 lg:p-6">
                {/* Welcome */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Welcome back, Programme Officer
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Monitor learners and coordinate welfare activities
                        across Tsangaya centres.
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <DashboardStatCard
                                key={stat.title}
                                label={stat.title}
                                value={stat.value}
                                description={stat.description}
                                icon={Icon}
                                tone={'tone' in stat ? stat.tone : 'navy'}
                            />
                        );
                    })}
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                        <div>
                            <CardTitle>Teacher Activity</CardTitle>
                            <CardDescription>
                                Recent teaching updates and classroom actions.
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/programme-officer/monitoring/activities">
                                View Full Timeline
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <ActivityTimeline
                            activities={recentTeacherActivities}
                            emptyMessage="Teacher updates will appear here as teachers record attendance, assessments, and completed sessions."
                        />
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <section className="space-y-3">
                    <div>
                        <h2 className="text-lg font-semibold">Quick Actions</h2>
                        <p className="text-sm text-muted-foreground">
                            Access your main programme management activities.
                        </p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        {quickActions.map((action) => {
                            const Icon = action.icon;

                            return (
                                <Card
                                    key={action.title}
                                    className="transition-shadow hover:shadow-md"
                                >
                                    <CardContent className="flex items-center justify-between gap-4 p-5">
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-lg bg-primary/10 p-2">
                                                <Icon className="h-5 w-5 text-primary" />
                                            </div>

                                            <div>
                                                <h3 className="font-semibold">
                                                    {action.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {action.description}
                                                </p>
                                            </div>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link href={action.href}>
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {/* Programme Responsibilities */}
                <Card>
                    <CardHeader>
                        <CardTitle>Programme Responsibilities</CardTitle>
                        <CardDescription>
                            Your main responsibilities within TSANGAYA+.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border p-4">
                            <GraduationCap className="mb-2 h-5 w-5 text-primary" />
                            <h3 className="font-semibold">
                                Learner Management
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Register learners and maintain their records.
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <HeartHandshake className="mb-2 h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Learner Welfare</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Document welfare needs and track assistance
                                provided.
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <CalendarDays className="mb-2 h-5 w-5 text-primary" />
                            <h3 className="font-semibold">
                                Teacher Activity Monitoring
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Monitor activities and updates submitted by
                                teachers.
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <ClipboardList className="mb-2 h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Programme Records</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Maintain learner and welfare records across the
                                programme.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
