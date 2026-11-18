import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import teacher from '@/routes/teacher';

interface Learner {
    id: number;
    learner_code: string;
    full_name: string;
}

interface LearningSession {
    id: number;
    class_group: string;
    topic: string;
    session_date: string;
    centre: {
        name: string;
    };
    subject: {
        name: string;
    };
}

interface AttendanceRecord {
    learner_id: number;
    status: string;
}

interface AttendancePageProps {
    session: LearningSession;
    learners: Learner[];
    existingAttendance: Record<string, AttendanceRecord>;
}

export default function AttendancePage({
    session,
    learners,
    existingAttendance,
}: AttendancePageProps) {
    const initialAttendance = learners.reduce(
        (attendance, learner) => {
            attendance[learner.id] =
                existingAttendance[learner.id]?.status ?? 'Present';

            return attendance;
        },
        {} as Record<number, string>,
    );

    const { data, setData, post, processing, errors } = useForm({
        attendance: initialAttendance,
    });

    const updateAttendance = (learnerId: number, status: string) => {
        setData('attendance', {
            ...data.attendance,
            [learnerId]: status,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(`/teacher/sessions/${session.id}/attendance`);
    };

    const sessionUrl = `/teacher/sessions/${session.id}`;

    return (
        <>
            <Head title="Record Attendance" />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={sessionUrl}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Record Attendance
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {session.topic} · {session.subject.name} ·{' '}
                            {session.class_group}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Attendance Register</CardTitle>
                            <CardDescription>
                                Mark the attendance status for each learner in{' '}
                                {session.centre.name}.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {learners.length > 0 ? (
                                learners.map((learner, index) => (
                                    <div
                                        key={learner.id}
                                        className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {index + 1}. {learner.full_name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {learner.learner_code}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Label className="text-sm">
                                                Status:
                                            </Label>

                                            <Select
                                                value={
                                                    data.attendance[learner.id]
                                                }
                                                onValueChange={(value) =>
                                                    updateAttendance(
                                                        learner.id,
                                                        value,
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="w-35">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="Present">
                                                        Present
                                                    </SelectItem>
                                                    <SelectItem value="Absent">
                                                        Absent
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="py-8 text-center text-sm text-muted-foreground">
                                    No active learners found in this class.
                                </p>
                            )}

                            {errors.attendance && (
                                <p className="text-sm text-destructive">
                                    {errors.attendance}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex justify-end gap-3">
                        <Button variant="outline" type="button" asChild>
                            <Link href={sessionUrl}>Cancel</Link>
                        </Button>

                        <Button
                            type="submit"
                            disabled={processing || learners.length === 0}
                        >
                            <ClipboardCheck className="mr-2 h-4 w-4" />
                            {processing ? 'Saving...' : 'Save Attendance'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
