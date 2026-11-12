import { Head } from "@inertiajs/react";
import { ClipboardList } from "lucide-react";

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

interface Centre {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
}

interface AssessmentRecord {
    id: number;
    learner: {
        id: number;
        name: string;
        centre: Centre;
    };
    subject: Subject;
    class_group: string;
    baseline_score: number | null;
    midline_score: number | null;
    endline_score: number | null;
    final_percentage: number | null;
    grade: string | null;
    performance: string | null;
    recorded_by: {
        name: string;
    };
}

interface Props {
    centres: Centre[];
    subjects: Subject[];
    records: AssessmentRecord[];
    filters: {
        centre_id?: string;
        subject_id?: string;
        class_group?: string;
    };
}

export default function AssessmentMonitoring({
    records,
}: Props) {
    return (
        <>
            <Head title="Assessment Monitoring" />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-3">
                        <ClipboardList className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Assessment Monitoring
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View learner assessment progress across centres,
                            subjects and classes.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Assessment Records</CardTitle>
                        <CardDescription>
                            Final percentage is the average of all recorded
                            baseline, midline, and endline scores, each out of
                            100.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {records.length === 0 ? (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No assessment records found.
                            </p>
                        ) : (
                            <div className="overflow-x-auto rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Learner</TableHead>
                                            <TableHead>Centre</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Class</TableHead>
                                            <TableHead>Baseline</TableHead>
                                            <TableHead>Midline</TableHead>
                                            <TableHead>Endline</TableHead>
                                            <TableHead>Final Average %</TableHead>
                                            <TableHead>Grade</TableHead>
                                            <TableHead>Performance</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {records.map((record) => (
                                            <TableRow key={record.id}>
                                                <TableCell className="font-medium">
                                                    {record.learner?.name}
                                                </TableCell>
                                                <TableCell>
                                                    {record.learner?.centre?.name}
                                                </TableCell>
                                                <TableCell>
                                                    {record.subject?.name}
                                                </TableCell>
                                                <TableCell>
                                                    {record.class_group}
                                                </TableCell>
                                                <TableCell>
                                                    {record.baseline_score ?? "—"}
                                                </TableCell>
                                                <TableCell>
                                                    {record.midline_score ?? "—"}
                                                </TableCell>
                                                <TableCell>
                                                    {record.endline_score ?? "—"}
                                                </TableCell>
                                                <TableCell>
                                                    {record.final_percentage !== null
                                                        ? `${record.final_percentage}%`
                                                        : "—"}
                                                </TableCell>
                                                <TableCell>
                                                    {record.grade ?? "—"}
                                                </TableCell>
                                                <TableCell>
                                                    {record.performance ?? "—"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}