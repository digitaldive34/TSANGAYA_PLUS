import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, UserPlus } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Centre {
    id: number;
    name: string;
}

interface CreateLearnerProps {
    centres: Centre[];
}

export default function CreateLearner({ centres }: CreateLearnerProps) {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        age: '',
        class_group: '',
        centre_id: '',
        registration_date: new Date().toISOString().split('T')[0],
        consent_status: 'Pending',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/programme-officer/learners');
    };

    return (
        <>
            <Head title="Register Learner" />

            <div className="space-y-6" px-6>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="ml-6"
                    >
                        <Link href="/programme-officer/learners">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>

                    <div>
                        <h1 className="pt-2 text-2xl font-bold tracking-tight">
                            Register Learner
                        </h1>
                        <p className="font-small text-sm text-muted-foreground">
                            Add a new learner to a registered Tsangaya centre.
                        </p>
                    </div>
                </div>

                <Card className="mx-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserPlus className="h-5 w-5" />
                            Learner Information
                        </CardTitle>
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
                                            setData('full_name', e.target.value)
                                        }
                                        placeholder="Enter learner's full name"
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
                                            setData('age', e.target.value)
                                        }
                                        placeholder="Enter learner's age"
                                    />
                                    <InputError message={errors.age} />
                                </div>

                                <div className="space-y-2">
                                    <Label>Class Group</Label>
                                    <Select
                                        value={data.class_group}
                                        onValueChange={(value) =>
                                            setData('class_group', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select class group" />
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
                                    <InputError message={errors.class_group} />
                                </div>

                                <div className="space-y-2">
                                    <Label>Tsangaya Centre</Label>
                                    <Select
                                        value={data.centre_id}
                                        onValueChange={(value) =>
                                            setData('centre_id', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select centre" />
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
                                    <InputError message={errors.centre_id} />
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
                                                'registration_date',
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
                                            setData('consent_status', value)
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
                            </div>

                            <div className="flex justify-end gap-3 border-t pt-5">
                                <Button variant="outline" asChild>
                                    <Link href="/programme-officer/learners">
                                        Cancel
                                    </Link>
                                </Button>

                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Registering...'
                                        : 'Register Learner'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
