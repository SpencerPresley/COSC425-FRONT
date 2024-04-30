import { SideNav } from '@/components/componentsCategoryPage/side-nav';

export default function CategoryLayout ({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="flex h-full w-full">
                <div className="md:basis-1/4 pr-5">
                    <SideNav />
                </div>
                <div className="basis-4/4 md:basis-2/4 mb-20">
                    {children}
                </div>
                <div className="md:basis-1/4">
                    <p></p>
                </div>
            </div>
        </>
    );
}
