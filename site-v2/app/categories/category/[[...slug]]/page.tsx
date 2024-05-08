/* NEXTJS AND NEXTUI UTILITIES & COMPONENTS */
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";


// user clicks a letter
// wer fetch all the categories and their data that start with that letter
// we sort it
// we display it




/* FOR CONDITIONAL RENDERING */
import { Faculty } from "./facultyRender/faculty";
import { Articles } from "./articleRender/article";
import { RenderCategory } from "./categoryRender/category";

/* FOR BASE PAGE STYLING */
import { Card } from "@nextui-org/card";

/* INTERFACES */
interface CategoryObject {
    [key: string]: {
        url: string;
        faculty_count: number;
        department_count: number;
        article_count: number;
        faculty: string[];
        departments: string[];
        titles: string[];
    };
}

interface CategoryData {
    url: string;
    faculty_count: number;
    department_count: number;
    article_count: number;
    faculty: string[];
    departments: string[];
    titles: string[];
}

interface CategoryProps {
    params: { category: string };
}

export default function Categories ({
    params,
}: {
    params: {
        slug?: string[];
    };
}) {

    const letters = "abcdefghijklmnopqrstuvwxyz".split("");

    // console.log("params.slug", params.slug); // Add this line to check what slug contains

    if (!params.slug) {
        return <div>
            <h1>not found 0</h1>
        </div>
    }

    console.log("params.slug[0]", params.slug[0]);
    console.log("params.slug[1]", params.slug[1]);

    /* IF SLUGS EXIST RENDER CONTENT RELATED TO THE SLUG(S) */
    if (params.slug) {
        console.log("params.slug", params.slug);
        if (params.slug.length === 2) { 
            console.log("params.slug[0]", params.slug[0]);
            console.log("params.slug[1]", params.slug[1]);
            if (params.slug[1] === 'articles') {
                return <div>
                    <Articles category={params.slug[0]} />
                </div>
            } else if (params.slug[1] === 'faculty') {
                return <div>
                    <Faculty category={params.slug[0]} />
                </div>
            } else {
                return <div>
                    <h1>not found 2</h1>
                </div>
            }
        } else if (params.slug.length === 1) {
            return <div>
                <RenderCategory category={params.slug[0]} />
            </div>
        }
    }

    /* IF SLUGS DON'T EXIST RENDER CATEGORIES A-Z PAGE */
    console.log("params.slug", params.slug);
    return <div>
        <h1>not found 1</h1>
    </div>
}