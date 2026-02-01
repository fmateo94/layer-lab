import { Header, TabBar } from "@/components/layout";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--color-bg)]">
            <Header />
            <main className="pb-20 md:pb-8">
                {children}
            </main>
            <TabBar />
        </div>
    );
}
