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
    console.log("GETURLSOBJ", obj);
    return obj;
}

export async function AzRender({ letter }: { letter: string }) {
    const urls = await getUrlsForLetter(letter);
    console.log("URLS", urls);

    if (!urls) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-6 py-10 md:py-12">
                <div className="inline-block max-w-2xl text-center">
                    <h1 className="text-4xl font-bold pb-8">Categories</h1>
                    <UrlsLetters />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                                        {urls.map((url) => (
                                                  
                                            <Card
                                                className="p-4 dark:bg-suMaroon/90 hover:bg-gray-100 bg-gray-50 shadow-black drop-shadow-md hover:drop-shadow-xl dark:hover:bg-suMaroon/70 transition-colors text-suMaroon dark:text-yellow-300 duration-150 ease-in-out"
                                                key={url.key}

                                            >
                                                <h2 className="text-xl font-bold">
                                          
                                                <Link
                                                      href={`/categories/category/${url.url}`} >
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
