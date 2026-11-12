import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, CalendarDays, Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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

interface LearningSessionShowProps {
    session: LearningSession;
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

export default function LearningSessionShow({
    session,
}: LearningSessionShowProps) {
    return (
        <>
            <Head title="Session Details" />

            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Button variant="ghost" asChild>
                            <Link href="/admin/learning-sessions">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Sessions
                            </Link>
                        </Button>

                        <h1 className="mt-3 text-2xl font-bold tracking-tight">
                            Session Details
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            View the information for this learning session.
                        </p>
                    </div>

                    <Button asChild>
                        <Link
                            href={`/admin/learning-sessions/${session.id}/edit`}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Session
                        </Link>
                    </Button>
                </div>

                {
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <CardTitle>{session.topic}</CardTitle>
                                    <CardDescription>
                                        Session #{session.id}
                                    </CardDescription>
                                </div>

                                <Badge
                                    variant={getStatusVariant(session.status)}
                                >
                                    {session.status}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Tsangaya Centre
                                </p>
                                <p className="mt-1 font-medium">
                                    {session.centre.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Subject
                                </p>
                                <p className="mt-1 font-medium">
                                    {session.subject.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Assigned Teacher
                                </p>
                                <p className="mt-1 font-medium">
                                    {session.teacher.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Class Group
                                </p>
                                <p className="mt-1 font-medium">
                                    {session.class_group}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Session Date
                                </p>
                                <p className="mt-1 flex items-center gap-2 font-medium">
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                    {new Date(
                                        session.session_date,
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Session Status
                                </p>
                                <p className="mt-1 font-medium">
                                    {session.status}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                }
            </div>
        </>
    );
}
