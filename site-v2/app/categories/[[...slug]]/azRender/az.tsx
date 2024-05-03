import { UrlsLetters } from "@/components/componentsCategoriesPage/urlsLetters";
import { Card } from "@nextui-org/card";
import { button as buttonStyles } from "@nextui-org/theme";
import { Code } from "@nextui-org/code";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Link from "next/link";

// user clicks a letter
// wer fetch all the categories and their data that start with that letter
// we sort it
// we display it

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
    category: string;
}

async function fetchS3Data() {
    const data = (await fetch(
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    ).then((res) => res.json())) as CategoryObject;

    return data;
}

async function getUrlsForLetter(letter: string) {
    const data = await fetchS3Data();
    const obj = Object.entries(data)
        .filter(([key, item]) => item.url.startsWith(letter))
        .map(([key, item]) => ({ key, url: item.url }))
        .sort((a, b) => a.url.localeCompare(b.url)); // Sorting by URL
    console.log(obj);
    return obj;
}

export async function AzRender({ letter }: { letter: string }) {
    const urls = await getUrlsForLetter(letter);
    // console.log(urls);

    if (!urls) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className="text-3xl font-bold pb-10">Categories</h1>
                    <UrlsLetters />
                    <div className="grid grid-cols-1 gap-4">
                        {urls.map((url) => (
                            <Card
                                key={url.key}
                                className="p-4"
                            >
                                <h2 className="text-xl font-bold">
                                    <Link
                                        href={`/categories/category/${url.url}`}
                                    >
                                        {url.key}
                                    </Link>
                                </h2>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
