import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, ClipboardList } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import teacher from "@/routes/teacher";

interface Learner {
    id: number;
    learner_code: string;
    full_name: string;
}

interface AssessmentRecord {
    id: number;
    learner_id: number;
    baseline_score: number | null;
    midline_score: number | null;
    endline_score: number | null;
    final_percentage: number | null;
    grade: string | null;
    performance: string | null;
}

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

interface AssessmentShowProps {
    register: AssessmentRegister;
    learners: Learner[];
    assessments: Record<string, AssessmentRecord[]>;
}

type AssessmentType = "Baseline" | "Midline" | "Endline";

interface LearnerAssessmentRowProps {
    learner: Learner;
    record?: AssessmentRecord;
    centreId: number;
    subjectId: number;
    classGroup: string;
}

export default function AssessmentShow({
    register,
    learners,
    assessments,
}: AssessmentShowProps) {
    return (
        <>
            <Head title="Assessment Register" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={teacher.assessments.index()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-2xl font-bold">
                            Assessment Register
                        </h1>
                        <p className="text-muted-foreground">
                            View and manage learner assessment scores.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {register.subject.name} — {register.class_group}
                        </CardTitle>
                        <CardDescription>
                            {register.centre.name}
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5" />
                            <CardTitle>Learner Scores</CardTitle>
                        </div>
                        <CardDescription>
                            Final percentage is the average of all recorded
                            baseline, midline, and endline scores, each out of
                            100.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {learners.length === 0 ? (
                            <p className="py-8 text-center text-muted-foreground">
                                No active learners found in this class.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Learner Code</TableHead>
                                            <TableHead>Full Name</TableHead>
                                            <TableHead>Baseline</TableHead>
                                            <TableHead>Midline</TableHead>
                                            <TableHead>Endline</TableHead>
                                            <TableHead>Final Average %</TableHead>
                                            <TableHead>Grade</TableHead>
                                            <TableHead>Performance</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {learners.map((learner) => (
                                            <LearnerAssessmentRow
                                                key={learner.id}
                                                learner={learner}
                                                record={assessments[learner.id]?.[0]}
                                                centreId={register.centre_id}
                                                subjectId={register.subject_id}
                                                classGroup={register.class_group}
                                            />
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

function LearnerAssessmentRow({
    learner,
    record,
    centreId,
    subjectId,
    classGroup,
}: LearnerAssessmentRowProps) {
    const [assessmentType, setAssessmentType] =
        React.useState<AssessmentType>("Baseline");

    const { data, setData, post, processing, errors } = useForm({
        centre_id: centreId,
        subject_id: subjectId,
        class_group: classGroup,
        learner_id: learner.id,
        assessment_type: assessmentType,
        score: "",
    });

    const handleAssessmentTypeChange = (value: AssessmentType) => {
        setAssessmentType(value);

        setData({
            centre_id: centreId,
            subject_id: subjectId,
            class_group: classGroup,
            learner_id: learner.id,
            assessment_type: value,
            score: "",
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(teacher.assessments.store().url);
    };

    const currentScore =
        assessmentType === "Baseline"
            ? record?.baseline_score
            : assessmentType === "Midline"
              ? record?.midline_score
              : record?.endline_score;

    return (
        <TableRow>
            <TableCell>{learner.learner_code}</TableCell>

            <TableCell className="font-medium">
                {learner.full_name}
            </TableCell>

            <TableCell>{record?.baseline_score ?? "—"}</TableCell>

            <TableCell>{record?.midline_score ?? "—"}</TableCell>

            <TableCell>{record?.endline_score ?? "—"}</TableCell>

            <TableCell>{record?.final_percentage ?? "—"}</TableCell>

            <TableCell>{record?.grade ?? "—"}</TableCell>

            <TableCell>{record?.performance ?? "—"}</TableCell>

            <TableCell>
                <form
                    onSubmit={handleSubmit}
                    className="flex min-w-90 items-center gap-2"
                >
                    <Select
                        value={assessmentType}
                        onValueChange={handleAssessmentTypeChange}
                    >
                        <SelectTrigger className="w-31.25">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="Baseline">
                                Baseline
                            </SelectItem>
                            <SelectItem value="Midline">
                                Midline
                            </SelectItem>
                            <SelectItem value="Endline">
                                Endline
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Score"
                        value={data.score}
                        onChange={(event) =>
                            setData("score", event.target.value)
                        }
                        className="w-24"
                        required
                    />

                    <Button type="submit" size="sm" disabled={processing}>
                        {processing ? "Saving..." : "Save"}
                    </Button>
                </form>

                {errors.score && (
                    <p className="mt-1 text-sm text-destructive">
                        {errors.score}
                    </p>
                )}

                {currentScore !== null && currentScore !== undefined && (
                    <p className="mt-1 text-xs text-muted-foreground">
                        Current {assessmentType} score: {currentScore}
                    </p>
                )}
            </TableCell>
        </TableRow>
    );
}
