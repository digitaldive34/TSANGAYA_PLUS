import type { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

const tones = {
    navy: {
        accent: 'bg-slate-700',
        icon: 'bg-slate-100 text-slate-700',
    },
    blue: {
        accent: 'bg-blue-600',
        icon: 'bg-blue-100 text-blue-700',
    },
    teal: {
        accent: 'bg-teal-600',
        icon: 'bg-teal-100 text-teal-700',
    },
    amber: {
        accent: 'bg-amber-500',
        icon: 'bg-amber-100 text-amber-700',
    },
    violet: {
        accent: 'bg-violet-600',
        icon: 'bg-violet-100 text-violet-700',
    },
} as const;

interface DashboardStatCardProps {
    label: string;
    value: number | string;
    description: string;
    icon: LucideIcon;
    tone?: keyof typeof tones;
}

export default function DashboardStatCard({
    label,
    value,
    description,
    icon: Icon,
    tone = 'navy',
}: DashboardStatCardProps) {
    const colors = tones[tone];

    return (
        <Card className="group relative overflow-hidden rounded-2xl border-t-0 border-slate-200/80 bg-card py-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div
                aria-hidden="true"
                className={`absolute inset-y-0 left-0 w-1 ${colors.accent}`}
            />
            <CardContent className="flex min-h-28 flex-col gap-1 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                    <p className="truncate pt-1 text-xs font-semibold tracking-wide text-muted-foreground">
                        {label}
                    </p>
                    <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${colors.icon}`}
                    >
                        <Icon className="size-5" aria-hidden="true" />
                    </div>
                </div>
                <p className="text-2xl leading-none font-bold tracking-tight text-foreground sm:text-3xl">
                    {value}
                </p>
                <p className="line-clamp-1 text-xs leading-tight text-muted-foreground">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}
