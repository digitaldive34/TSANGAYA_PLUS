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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Learner {
    id: number;
    learner_code: string;
    full_name: string;
    centre: {
        name: string;
    };
}

interface CreateWelfareProps {
    learners: Learner[];
}
export default function CreateWelfare({ learners }: CreateWelfareProps) {
    const { data, setData, post, processing, errors } = useForm({
        learner_id: '',
        category: '',
        description: '',
        identified_date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/programme-officer/welfare');
    };

    return (
        <>
            <Head title="Record Welfare Need" />

            <div className="space-y-6 p-6">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/programme-officer/welfare">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Record Welfare Need
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Record a welfare concern identified for a learner.
                        </p>
                    </div>
                </div>

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <HeartHandshake className="h-5 w-5" />
                            Welfare Information
                        </CardTitle>
                        <CardDescription>
                            Provide the details of the learner's welfare need.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Learner */}
                                <div className="space-y-2">
                                    <Label htmlFor="learner_id">
                                        Select Learner
                                    </Label>
                                    <Select
                                        value={data.learner_id}
                                        onValueChange={(value) =>
                                            setData('learner_id', value)
                                        }
                                    >
                                        <SelectTrigger id="learner_id">
                                            <SelectValue placeholder="Choose a learner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {learners.map((learner) => (
                                                <SelectItem
                                                    key={learner.id}
                                                    value={String(learner.id)}
                                                >
                                                    {learner.full_name} (
                                                    {learner.learner_code}) —{' '}
                                                    {learner.centre.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.learner_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.learner_id}
                                        </p>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="category">
                                        Welfare Category
                                    </Label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(value) =>
                                            setData('category', value)
                                        }
                                    >
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Clothing">
                                                Clothing
                                            </SelectItem>
                                            <SelectItem value="Health">
                                                Health
                                            </SelectItem>
                                            <SelectItem value="Learning Materials">
                                                Learning Materials
                                            </SelectItem>
                                            <SelectItem value="Other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-sm text-destructive">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description of Welfare Need
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe the welfare concern identified..."
                                        rows={5}
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

                                {/* Identified Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="identified_date">
                                        Date Identified
                                    </Label>
                                    <Input
                                        id="identified_date"
                                        type="date"
                                        value={data.identified_date}
                                        onChange={(e) =>
                                            setData(
                                                'identified_date',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.identified_date && (
                                        <p className="text-sm text-destructive">
                                            {errors.identified_date}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        asChild
                                    >
                                        <Link href="/programme-officer/welfare">
                                            Cancel
                                        </Link>
                                    </Button>

                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Saving...'
                                            : 'Record Welfare Need'}
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
