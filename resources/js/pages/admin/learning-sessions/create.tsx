import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Centre {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
}

interface Teacher {
    id: number;
    name: string;
    centre_id: number | null;
}

interface CreateLearningSessionProps {
    centres: Centre[];
    subjects: Subject[];
    teachers: Teacher[];
}

function getLocalDateString() {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

    return today.toISOString().slice(0, 10);
}

export default function CreateLearningSession({
    centres,
    subjects,
    teachers,
}: CreateLearningSessionProps) {
    const { data, setData, post, processing, errors } = useForm({
        centre_id: "",
        subject_id: "",
        teacher_id: "",
        class_group: "",
        topic: "",
        session_date: getLocalDateString(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post("/admin/learning-sessions");
    };

    return (
        <>
            <Head title="Create Learning Session" />

            <div className="space-y-6 p-6">
                <div>
                    <Button variant="ghost" asChild>
                        <Link href="/admin/learning-sessions">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Learning Sessions
                        </Link>
                    </Button>

                    <h1 className="mt-3 text-2xl font-bold tracking-tight">
                        Create Learning Session
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Schedule a learning session for a Tsangaya centre.
                    </p>
                </div>

                {
                    <Card>
                        <CardHeader>
                            <CardTitle>Session Information</CardTitle>
                            <CardDescription>
                                Provide the details of the learning session.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Centre field */}
                                <div className="space-y-2">
                                    <Label htmlFor="centre_id">
                                        Tsangaya Centre
                                    </Label>

                                    <Select
                                        value={data.centre_id}
                                        onValueChange={(value) =>
                                            setData("centre_id", value)
                                        }
                                    >
                                        <SelectTrigger id="centre_id">
                                            <SelectValue placeholder="Select a centre" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {centres.map((centre) => (
                                                <SelectItem
                                                    key={centre.id}
                                                    value={String(centre.id)}
                                                >
                                                    {centre.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {errors.centre_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.centre_id}
                                        </p>
                                    )}
                                </div>

                                {/* Subject field */}
                                <div className="space-y-2">
                                    <Label htmlFor="subject_id">Subject</Label>

                                    <Select
                                        value={data.subject_id}
                                        onValueChange={(value) =>
                                            setData("subject_id", value)
                                        }
                                    >
                                        <SelectTrigger id="subject_id">
                                            <SelectValue placeholder="Select a subject" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {subjects.map((subject) => (
                                                <SelectItem
                                                    key={subject.id}
                                                    value={String(subject.id)}
                                                >
                                                    {subject.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {errors.subject_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.subject_id}
                                        </p>
                                    )}
                                </div>

                                {/* Teacher field */}
                                <div className="space-y-2">
                                    <Label htmlFor="teacher_id">
                                        Assigned Teacher
                                    </Label>

                                    <Select
                                        value={data.teacher_id}
                                        onValueChange={(value) =>
                                            setData("teacher_id", value)
                                        }
                                    >
                                        <SelectTrigger id="teacher_id">
                                            <SelectValue placeholder="Select a teacher" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {teachers.map((teacher) => (
                                                <SelectItem
                                                    key={teacher.id}
                                                    value={String(teacher.id)}
                                                >
                                                    {teacher.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    {errors.teacher_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.teacher_id}
                                        </p>
                                    )}
                                </div>
                                {/* Class Group field */}
                                <div className="space-y-2">
                                    <Label htmlFor="class_group">
                                        Class Group
                                    </Label>

                                    <Select
                                        value={data.class_group}
                                        onValueChange={(value) =>
                                            setData("class_group", value)
                                        }
                                    >
                                        <SelectTrigger id="class_group">
                                            <SelectValue placeholder="Select a class" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="Class A">
                                                Class A
                                            </SelectItem>
                                            <SelectItem value="Class B">
                                                Class B
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {errors.class_group && (
                                        <p className="text-sm text-destructive">
                                            {errors.class_group}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="topic">
                                        Learning Topic
                                    </Label>

                                    <Input
                                        id="topic"
                                        value={data.topic}
                                        onChange={(e) =>
                                            setData("topic", e.target.value)
                                        }
                                        placeholder="Enter the topic for this session"
                                        required
                                    />

                                    {errors.topic && (
                                        <p className="text-sm text-destructive">
                                            {errors.topic}
                                        </p>
                                    )}
                                </div>
                                {/* Session Date field */}
                                <div className="space-y-2">
                                    <Label htmlFor="session_date">
                                        Session Date
                                    </Label>

                                    <Input
                                        id="session_date"
                                        type="date"
                                        value={data.session_date}
                                        onChange={(e) =>
                                            setData(
                                                "session_date",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {errors.session_date && (
                                        <p className="text-sm text-destructive">
                                            {errors.session_date}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3 border-t pt-6">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        asChild
                                    >
                                        <Link href="/admin/learning-sessions">
                                            Cancel
                                        </Link>
                                    </Button>

                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? "Creating..."
                                            : "Create Session"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                }
            </div>
        </>
    );
}
