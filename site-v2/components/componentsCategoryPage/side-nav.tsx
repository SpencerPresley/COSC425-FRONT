import Link from "next/link";
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

async function getUrls() {
    const data = await fetchS3Data();
    const urls = Object.values(data)
        .map((category: any) => category.url)
        .sort();
    return urls;
}

async function fetchS3Data() {
    const data = (await fetch(
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    ).then((res) => res.json())) as CategoryObject;
    return data;
}

export async function SideNav() {
    const categoryUrls = await getUrls();

    return (
        <div className="md:w-full text-white dark:text-white bg-slate-900 dark:bg-background hidden md:flex max-h-screen">
            {/* ... */}
            <div className="flex flex-col space-y-2 md:px-6 overflow-scroll max-h-screen">
                <h1 className="shrink-0 pb-5 font-bold text-3xl w-full text-center my-auto">
                    Category A-Z
                </h1>
                {categoryUrls.map((url) => (
                    <div
                        key={url}
                        className="shrink-0 w-full text-center my-auto"
                    >
                        <Link href={`/categories/category/${url}`}>
                            <h2 className="text-md">
                                {url
                                    .split("-")
                                    .map(
                                        (word: any) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                    )
                                    .join(" ")}
                            </h2>
                        </Link>
                    </div>
                ))}
            </div>
            {/* ... */}
        </div>
    );
}

