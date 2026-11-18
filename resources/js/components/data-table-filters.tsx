import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export interface DataTableFilter {
    key: string;
    label: string;
    value: string;
    options: {
        label: string;
        value: string;
    }[];
    onChange: (value: string) => void;
}

interface DataTableFiltersProps {
    search: string;
    searchPlaceholder: string;
    onSearchChange: (value: string) => void;
    filters?: DataTableFilter[];
    onApply?: () => void;
    onClear?: () => void;
}

export default function DataTableFilters({
    search,
    searchPlaceholder,
    onSearchChange,
    filters = [],
    onApply,
    onClear,
}: DataTableFiltersProps) {
    return (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <div className="min-w-52 flex-1 space-y-1.5">
                <span className="text-sm font-medium">Search</span>
                <div className="relative">
                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        aria-label={searchPlaceholder}
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {filters.map((filter) => (
                <div key={filter.key} className="min-w-40 space-y-1.5 lg:w-48">
                    <span className="text-sm font-medium">{filter.label}</span>
                    <Select
                        value={filter.value}
                        onValueChange={filter.onChange}
                    >
                        <SelectTrigger aria-label={filter.label}>
                            <SelectValue placeholder={filter.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {filter.options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            ))}

            {onApply && (
                <div className="flex gap-2">
                    <Button type="button" onClick={onApply}>
                        Apply
                    </Button>
                    {onClear && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClear}
                        >
                            Clear
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
