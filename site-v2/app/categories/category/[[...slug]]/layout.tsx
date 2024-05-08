import { SideNav } from '@/components/componentsCategoryPage/side-nav';

export default function CategoryLayout ({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div>
                    {children}
            </div>
        </>
    );
}
