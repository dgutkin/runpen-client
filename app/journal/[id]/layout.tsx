
import BackgroundLayout from '@/app/components/BackgroundLayout';

export default function JournalLayout({ children }: { children: React.ReactNode }) {
    return (
        <BackgroundLayout>
            {children}
        </BackgroundLayout>
    );
}
