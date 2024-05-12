import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Card } from "@nextui-org/card";

export default function Home() {
	return (
		<Card className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 bg-suMaroon rounded-lg text-white">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Search Through SU Research Categories</h1>
				
				<h2 className={subtitle({ class: "mt-4" })}>
					Search through research categories to get information on Faculty, Departments, and Articles that are related to the category
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					isExternal
					href="/"
					className={buttonStyles({radius: "full", variant: "bordered" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href=""
				>
				About
				</Link>
				</div>
				<Link
            className={buttonStyles({ radius: "full", variant: "bordered" })}
            href="/categories"
        >
            Start Browsing Categories
        </Link>

		</Card>
	);
}