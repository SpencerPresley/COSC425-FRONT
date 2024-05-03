import { Card } from "@nextui-org/card";
import { button as buttonStyles } from "@nextui-org/theme";
import { Code } from "@nextui-org/code";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Link from "next/link";
import { AzRender } from "./azRender/az";
import { UrlsLetters } from "@/components/componentsCategoriesPage/urlsLetters";

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

function groupUrlsByFirstLetter(urls: { key: string; url: string }[]) {
    return urls.reduce(
        (acc: { [key: string]: { key: string; url: string }[] }, url) => {
            const firstLetter = url.key[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(url);
            return acc;
        },
        {}
    );
}

/* No singleton pattern necessary.
   Next.js fetch() automatically memoizes data 
   */
async function fetchS3Data() {
    const data = (await fetch(
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    ).then((res) => res.json())) as CategoryObject;

    return data;
}

async function getUrls() {
    // const data = await fetchS3Data();

    // return Object.values(data)
    //     .map((item) => item.url)
    //     .sort();

    const data = await fetchS3Data();
    return Object.entries(data)
        .map(([key, item]) => ({ key, url: item.url }))
        .sort((a, b) => a.url.localeCompare(b.url)); // Sorting by URL
}

export default async function CategoriesPage({
    params,
}: {
    params: {
        slug?: string[];
    };
}) {
    const slugs = params.slug || [];
    const urls = await getUrls();

    // console.log(urls);

    if (!urls) {
        return <div>Loading...</div>;
    }

    if (slugs.length === 1) {
        return (
            <div>
                <AzRender letter={slugs[0]} />
            </div>
        );
    }

    if (slugs.length === 0) {
        return (
            <>
                <div className="flex flex-col items-center justify-center gap-6 py-10 md:py-12">
                    <div className="inline-block max-w-2xl text-center">
                        <h1 className="text-4xl font-bold pb-8">Categories</h1>
                        <UrlsLetters />
                        {Object.entries(groupUrlsByFirstLetter(urls)).map(
                            ([letter, urls]) => (
                                <div
                                    key={letter}
                                    className="mt-8 first:mt-0 pb-8 border-b border-gray-200 dark:border-gray-700"
                                >
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {letter.toUpperCase()}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {urls.map((url) => (
                                            <Card
                                                key={url.key}
                                                className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <h2 className="text-xl font-bold">
                                                    <Link
                                                        href={`/categories/category/${url.url}`}
                                                        className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
                                                    >
                                                        {url.key}
                                                    </Link>
                                                </h2>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </>
        );
    }
}
