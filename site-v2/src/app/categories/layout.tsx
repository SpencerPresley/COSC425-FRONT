import { SideNav } from "@/components/componentsCategoryPage/side-nav";

export default function CategoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-black flex h-full w-full">
            <div className="md:basis-1/4 pt-8">
                <SideNav />
            </div>
            <div className="basis-4/4 md:basis-2/4 mt-5 mb-20">{children}</div>
            <div className=" md:basis-1/4">
                <p></p>
            </div>
        </div>
    );
}
