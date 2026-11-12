import { Head, Link } from "@inertiajs/react";
import { BookOpen, ClipboardList } from "lucide-react";

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

interface AssessmentRegister {
    centre_id: number;
    subject_id: number;
    class_group: string;
    centre: {
        name: string;
    };
    subject: {
        name: string;
    };
}

interface AssessmentIndexProps {
    registers: AssessmentRegister[];
}

export default function AssessmentIndex({ registers }: AssessmentIndexProps) {
    return (
        <>
            <Head title="Assessment Registers" />

            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Assessment Registers
                    </h1>

                    <p className="text-muted-foreground">
                        Manage learner assessments for your assigned subjects
                        and classes.
                    </p>
                </div>

                {registers.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {registers.map((register) => (
                            <Card
                                key={`${register.centre_id}-${register.subject_id}-${register.class_group}`}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                <BookOpen className="h-5 w-5" />
                                                {register.subject.name}
                                            </CardTitle>

                                            <CardDescription className="mt-2">
                                                {register.centre.name}
                                            </CardDescription>
                                        </div>

                                        <Badge variant="secondary">
                                            {register.class_group}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <Button className="w-full" asChild>
                                        <Link
                                            href={`/teacher/assessments/register?${new URLSearchParams(
                                                {
                                                    centre_id: String(
                                                        register.centre_id,
                                                    ),
                                                    subject_id: String(
                                                        register.subject_id,
                                                    ),
                                                    class_group:
                                                        register.class_group,
                                                },
                                            ).toString()}`}
                                        >
                                            <ClipboardList className="mr-2 h-4 w-4" />
                                            Open Register
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <ClipboardList className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

                            <h3 className="font-semibold">
                                No assessment registers available
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Assessment registers will appear once subjects
                                and classes have been assigned to you.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}
