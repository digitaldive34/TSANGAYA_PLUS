import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    GraduationCap,
    MapPin,
    User,
    UserRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Learner {
    id: number;
    learner_code: string;
    full_name: string;
    age: number | null;
    class_group: string;
    registration_date: string;
    status: string;
    consent_status: string;
    consent_date: string | null;
    centre: {
        id: number;
        name: string;
        location: string;
    };
    registered_by: {
        id: number;
        name: string;
    };
}

interface LearnerShowProps {
    learner: Learner;
}

export default function ShowLearner({ learner }: LearnerShowProps) {
    const formatDate = (date: string | null) => {
        if (!date) return 'Not recorded';

        return new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <>
            <Head title={`${learner.full_name} - Learner Details`} />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/programme-officer/learners">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Learner Details
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View the learner's registration information.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                <UserRound className="h-7 w-7 text-primary" />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold">
                                    {learner.full_name}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {learner.learner_code}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Badge
                                variant={
                                    learner.status === 'active'
                                        ? 'default'
                                        : 'secondary'
                                }
                            >
                                {learner.status}
                            </Badge>

                            <Badge variant="outline">
                                {learner.class_group}
                            </Badge>

                            <Button asChild>
                                <Link
                                    href={`/programme-officer/learners/${learner.id}/edit`}
                                >
                                    Edit Learner
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Full Name
                                </p>
                                <p className="font-medium">
                                    {learner.full_name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Age
                                </p>
                                <p className="font-medium">
                                    {learner.age ?? 'Not recorded'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Class Group
                                </p>
                                <p className="font-medium">
                                    {learner.class_group}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Learner Code
                                </p>
                                <p className="font-medium">
                                    {learner.learner_code}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Centre Information
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Tsangaya Centre
                                </p>
                                <p className="font-medium">
                                    {learner.centre.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Centre Location
                                </p>
                                <p className="font-medium">
                                    {learner.centre.location}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Registration Date
                                </p>
                                <p className="flex items-center gap-2 font-medium">
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                    {formatDate(learner.registration_date)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Registered By
                                </p>
                                <p className="font-medium">
                                    {learner.registered_by.name}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Consent Information
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Consent Status
                                </p>
                                <Badge variant="outline" className="mt-2">
                                    {learner.consent_status}
                                </Badge>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Consent Recorded Date
                                </p>
                                <p className="mt-2 font-medium">
                                    {formatDate(learner.consent_date)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
