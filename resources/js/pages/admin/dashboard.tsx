import { Head, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Bell,
    Plus,
    Users,
    GraduationCap,
    Building2,
    BookOpen,
    CalendarDays,
    ClipboardCheck,
    UserPlus,
    Activity as ActivityIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import admin from "@/routes/admin";

interface ActivityRecord {
    id: number;
    user: {
        name: string;
    } | null;
    role: string | null;
    action: string;
    description: string;
    created_at: string;
}

interface AdminDashboardProps {
    totalLearners: number;
    activeLearners: number;
    activeCentres: number;
    staffMembers: number;
    totalSessions: number;
    scheduledSessions: number;
    deliveredSessions: number;
    recentActivities: ActivityRecord[];
}

const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
};

const formatAction = (action: string) => {
    return action
        .split(".")
        .map((word) =>
            word
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase()),
        )
        .join(" ");
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function AdminDashboard({
    totalLearners,
    activeLearners,
    activeCentres,
    staffMembers,
    totalSessions,
    scheduledSessions,
    deliveredSessions,
    recentActivities,
}: AdminDashboardProps) {
    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen space-y-6 bg-slate-50 p-6">
                {/* Welcome Section */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-medium text-slate-500">
                            TSANGAYA+ / Administration
                        </p>

                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            Welcome back, Admin
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Here's an overview of your programme today.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon">
                            <Bell className="size-4" />
                        </Button>

                        <Avatar>
                            <AvatarFallback className="bg-slate-900 text-white">
                                AD
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                {/* Programme Statistics */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                Total Learners
                            </CardTitle>
                            <GraduationCap className="size-5 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">
                                {totalLearners}
                            </div>
                            <p className="text-xs text-slate-500">
                                Across all centres
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                Active Learners
                            </CardTitle>
                            <Users className="size-5 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">
                                {activeLearners}
                            </div>
                            <p className="text-xs text-slate-500">
                                Currently enrolled
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                Active Centres
                            </CardTitle>
                            <Building2 className="size-5 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">
                                {activeCentres}
                            </div>
                            <p className="text-xs text-slate-500">
                                Registered centres
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                Staff Members
                            </CardTitle>
                            <Users className="size-5 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">
                                {staffMembers}
                            </div>
                            <p className="text-xs text-slate-500">
                                Across all roles
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                Learning Sessions
                            </CardTitle>
                            <BookOpen className="size-5 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">
                                {totalSessions}
                            </div>
                            <p className="text-xs text-slate-500">
                                Sessions created
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                Scheduled Sessions
                            </CardTitle>
                            <CalendarDays className="size-5 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">
                                {scheduledSessions}
                            </div>
                            <p className="text-xs text-slate-500">
                                Planned learning sessions
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                Delivered Sessions
                            </CardTitle>
                            <ClipboardCheck className="size-5 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">
                                {deliveredSessions}
                            </div>
                            <p className="text-xs text-slate-500">
                                Completed learning sessions
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Quick Actions
                        </h2>
                        <p className="text-sm text-slate-500">
                            Manage your programme from one place.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                                        router.visit("/admin/users/create")
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
                                    onClick={() => router.visit("/admin/users")}
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
                                        router.visit("/admin/centres/create")
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
                                            "/admin/learning-sessions/create",
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
                                A record of recent activities across the
                                programme.
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.visit("/admin/activities")}
                        >
                            View All
                        </Button>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        {recentActivities.length > 0 ? (
                            recentActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback className="bg-slate-100 text-slate-700">
                                                {activity.user
                                                    ? getInitials(
                                                          activity.user.name,
                                                      )
                                                    : "SY"}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                {activity.user?.name ??
                                                    "System"}
                                                {activity.role && (
                                                    <span className="ml-2 text-xs font-normal text-slate-500">
                                                        ({activity.role})
                                                    </span>
                                                )}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-600">
                                                {activity.description}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                {formatDate(
                                                    activity.created_at,
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <Badge variant="secondary">
                                        {formatAction(activity.action)}
                                    </Badge>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <ActivityIcon className="mb-3 size-8 text-slate-400" />
                                <p className="font-medium text-slate-700">
                                    No activities recorded yet
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Activities will appear here as staff use the
                                    platform.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
