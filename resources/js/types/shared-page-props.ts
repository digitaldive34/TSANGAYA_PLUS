import type { Auth } from '@/types/auth';

export type SharedPageProps = Record<string, unknown> & {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
};
