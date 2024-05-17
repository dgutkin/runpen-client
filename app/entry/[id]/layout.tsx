
import BackgroundLayout from '@/app/components/BackgroundLayout';

export default function EntryLayout({ children }: { children: React.ReactNode }) {
    return (
        <BackgroundLayout>
            {children}
        </BackgroundLayout>
    );
}
