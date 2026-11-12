import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    MapPin,
    Users,
    Wifi,
    Zap,
    Laptop,
    GraduationCap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Teacher {
    id: number;
    name: string;
}

interface Centre {
    id: number;
    name: string;
    location: string;
    learner_population: number | null;
    internet_availability: string | null;
    electricity_availability: string | null;
    technology_readiness: string | null;
    status: "active" | "inactive";
    learners_count: number;
    users: Teacher[];
}

interface Props {
    centre: Centre;
    teachersCount: number;
}

export default function CentreShow({ centre, teachersCount }: Props) {
    return (
        <>
            <Head title={`${centre.name} - Centre Details`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/centres">
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            TSANGAYA+ / Centre Management
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Centre Details
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View information about this Tsangaya centre.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    {centre.name}
                                </h2>
                                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="size-4" />
                                    {centre.location}
                                </p>
                            </div>

                            <Button variant="outline" asChild>
                                <Link href={`/admin/centres/${centre.id}/edit`}>
                                    Edit Centre
                                </Link>
                            </Button>
                        </div>

                        <Badge
                            variant={
                                centre.status === "active"
                                    ? "default"
                                    : "secondary"
                            }
                        >
                            {centre.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                    </CardContent>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Learner Population
                            </CardTitle>
                            <Users className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {centre.learner_population ?? "Not specified"}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Registered Learners
                            </CardTitle>
                            <GraduationCap className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {centre.learners_count}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Assigned Teachers
                            </CardTitle>
                            <Users className="size-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {teachersCount}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Infrastructure and Technology</CardTitle>
                    </CardHeader>

                    <CardContent className="grid gap-6 sm:grid-cols-2">
                        <div className="flex items-start gap-3">
                            <Wifi className="mt-1 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Internet Availability
                                </p>
                                <p className="font-medium">
                                    {centre.internet_availability ??
                                        "Not specified"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Zap className="mt-1 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Electricity Availability
                                </p>
                                <p className="font-medium">
                                    {centre.electricity_availability ??
                                        "Not specified"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Laptop className="mt-1 size-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Technology Readiness
                                </p>
                                <p className="font-medium">
                                    {centre.technology_readiness ??
                                        "Not specified"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Assigned Teachers</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {centre.users.length === 0 ? (
                            <p className="py-4 text-sm text-muted-foreground">
                                No teachers have been assigned to this centre
                                yet.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {centre.users.map((teacher) => (
                                    <div
                                        key={teacher.id}
                                        className="flex items-center gap-3 rounded-lg border p-3"
                                    >
                                        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                                            <GraduationCap className="size-5" />
                                        </div>
                                        <p className="font-medium">
                                            {teacher.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
