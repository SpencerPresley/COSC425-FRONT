import { SideNav } from "@/components/componentsCategoryPage/side-nav";

import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "../providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

export default function CategoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className={clsx(
                "max-h-screen text-black dark:text-white dark:bg-background bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
            <Providers
                themeProps={{ attribute: "class", defaultTheme: "dark" }}
            >
                <div className="flex max-h-screen w-full mx-auto">
                    <div className="md:basis-1/4 pr-5 h-full overflow-auto">
                        <SideNav />
                    </div>
                    <div className="basis-4/4 md:basis-3/4 h-full overflow-auto">
                        {children}
                    </div>
                </div>
            </Providers>
        </div>
    );
}
