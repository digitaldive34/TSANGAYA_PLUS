import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, UserRoundPen } from "lucide-react";

import InputError from "@/components/input-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Learner {
    id: number;
    learner_code: string;
    full_name: string;
    age: number | null;
    class_group: string;
    centre_id: number;
    registration_date: string;
    status: string;
    consent_status: string;
    centre: {
        id: number;
        name: string;
    };
}

interface EditLearnerProps {
    learner: Learner;
}

export default function EditLearner({ learner }: EditLearnerProps) {
    const { data, setData, put, processing, errors } = useForm({
        full_name: learner.full_name,
        age: learner.age?.toString() ?? "",
        class_group: learner.class_group,
        registration_date: learner.registration_date,
        status: learner.status,
        consent_status: learner.consent_status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/programme-officer/learners/${learner.id}`);
    };

    return (
        <>
            <Head title={`Edit ${learner.full_name}`} />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link
                            href={`/programme-officer/learners/${learner.id}`}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Edit Learner
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Update the learner's registration information.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserRoundPen className="h-5 w-5" />
                            Learner Information
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Learner Code: {learner.learner_code}
                        </p>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name"
                                        value={data.full_name}
                                        onChange={(e) =>
                                            setData("full_name", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.full_name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        min="1"
                                        max="15"
                                        value={data.age}
                                        onChange={(e) =>
                                            setData("age", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.age} />
                                </div>

                                <div className="space-y-2">
                                    <Label>Registered Tsangaya Centre</Label>
                                    <Input
                                        value={learner.centre.name}
                                        disabled
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Centre transfers must be handled
                                        separately.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="registration_date">
                                        Registration Date
                                    </Label>
                                    <Input
                                        id="registration_date"
                                        type="date"
                                        value={data.registration_date}
                                        onChange={(e) =>
                                            setData(
                                                "registration_date",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.registration_date}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Consent Status</Label>
                                    <Select
                                        value={data.consent_status}
                                        onValueChange={(value) =>
                                            setData("consent_status", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select consent status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pending">
                                                Pending
                                            </SelectItem>
                                            <SelectItem value="Granted">
                                                Granted
                                            </SelectItem>
                                            <SelectItem value="Declined">
                                                Declined
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError
                                        message={errors.consent_status}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Registration Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) =>
                                            setData("status", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">
                                                Active
                                            </SelectItem>
                                            <SelectItem value="inactive">
                                                Inactive
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 border-t pt-5">
                                <Button variant="outline" asChild>
                                    <Link
                                        href={`/programme-officer/learners/${learner.id}`}
                                    >
                                        Cancel
                                    </Link>
                                </Button>

                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? "Saving Changes..."
                                        : "Save Changes"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
