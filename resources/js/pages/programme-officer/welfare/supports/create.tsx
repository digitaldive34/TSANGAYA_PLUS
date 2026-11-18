import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, HeartHandshake } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface WelfareNeed {
    id: number;
    category: string;
    learner: {
        full_name: string;
        learner_code: string;
        centre: {
            name: string;
        };
    };
}

interface CreateSupportProps {
    welfareNeed: WelfareNeed;
}

export default function CreateSupport({ welfareNeed }: CreateSupportProps) {
    const { data, setData, post, processing, errors } = useForm({
        support_type: '',
        description: '',
        date_provided: new Date().toISOString().split('T')[0],
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/programme-officer/welfare/${welfareNeed.id}/supports`);
    };

    return (
        <>
            <Head title="Record Welfare Support" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link
                            href={`/programme-officer/welfare/${welfareNeed.id}`}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Record Welfare Support
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Record assistance provided for a learner's welfare
                            need.
                        </p>
                    </div>
                </div>

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <HeartHandshake className="h-5 w-5" />
                            Support Information
                        </CardTitle>
                        <CardDescription>
                            Recording support for{' '}
                            {welfareNeed.learner.full_name} (
                            {welfareNeed.learner.learner_code}) at{' '}
                            {welfareNeed.learner.centre.name}.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Support Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="support_type">
                                        Type of Support
                                    </Label>
                                    <Select
                                        value={data.support_type}
                                        onValueChange={(value) =>
                                            setData('support_type', value)
                                        }
                                    >
                                        <SelectTrigger id="support_type">
                                            <SelectValue placeholder="Select support type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Financial Assistance">
                                                Financial Assistance
                                            </SelectItem>
                                            <SelectItem value="Material Assistance">
                                                Material Assistance
                                            </SelectItem>
                                            <SelectItem value="Referral">
                                                Referral
                                            </SelectItem>
                                            <SelectItem value="Other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.support_type && (
                                        <p className="text-sm text-destructive">
                                            {errors.support_type}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description of Support
                                    </Label>
                                    <Textarea
                                        id="description"
                                        rows={4}
                                        placeholder="Describe the assistance provided..."
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Date Provided */}
                                <div className="space-y-2">
                                    <Label htmlFor="date_provided">
                                        Date Provided
                                    </Label>
                                    <Input
                                        id="date_provided"
                                        type="date"
                                        value={data.date_provided}
                                        onChange={(e) =>
                                            setData(
                                                'date_provided',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.date_provided && (
                                        <p className="text-sm text-destructive">
                                            {errors.date_provided}
                                        </p>
                                    )}
                                </div>

                                {/* Optional Notes */}
                                <div className="space-y-2">
                                    <Label htmlFor="notes">
                                        Additional Notes (Optional)
                                    </Label>
                                    <Textarea
                                        id="notes"
                                        rows={3}
                                        placeholder="Add any relevant notes..."
                                        value={data.notes}
                                        onChange={(e) =>
                                            setData('notes', e.target.value)
                                        }
                                    />
                                    {errors.notes && (
                                        <p className="text-sm text-destructive">
                                            {errors.notes}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        asChild
                                    >
                                        <Link
                                            href={`/programme-officer/welfare/${welfareNeed.id}`}
                                        >
                                            Cancel
                                        </Link>
                                    </Button>

                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Saving...'
                                            : 'Record Support'}
                                    </Button>
                                </div>
                            </form>
                        }
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
