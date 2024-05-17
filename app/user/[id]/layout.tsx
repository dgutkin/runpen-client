import BackgroundLayout from '@/app/components/BackgroundLayout';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <BackgroundLayout>
            {children}
        </BackgroundLayout>
    );
}
