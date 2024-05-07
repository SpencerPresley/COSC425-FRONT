import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import type { Viewport } from 'next';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "black" },
        { media: "(prefers-color-scheme: dark)", color: "white" },
    ],
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

// export const viewport: Viewport = {

// }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <head />
            <body
                className={clsx(
                    "min-h-screen dark:bg-black bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <Providers
                    themeProps={{ attribute: "class", defaultTheme: "dark" }}
                >
                    <div className="relative flex flex-col h-screen">
                        <Navbar />
                        <main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
                            {children}
                        </main>
                        <footer className="w-full flex items-center justify-center py-3">
                            <Link
                                isExternal
                                className="flex items-center gap-1 text-current"
                                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                                title="nextui.org homepage"
                            >
                                <span className="text-default-600">
                                    Powered by
                                </span>
                                <p className="text-primary">SU Students</p>
                            </Link>
                        </footer>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
