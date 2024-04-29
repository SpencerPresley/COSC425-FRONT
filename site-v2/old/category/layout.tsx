import { SideNav } from "@/components/componentsCategoryPage/side-nav";

import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "../../app/providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

export default function CategoryLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen h-screen overflow-hidden">
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="flex h-full w-full mx-auto overflow-hidden"> {/* Ensure the flex container fits the screen height */}
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
