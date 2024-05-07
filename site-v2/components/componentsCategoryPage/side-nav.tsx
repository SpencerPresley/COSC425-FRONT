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
        <div className="md:w-full border-double border-4 border-black  dark:border-white dark:border-separate dark:rounded-lg border-separate rounded-lg text-white dark:text-white bg-suMaroon dark:bg-suMaroon/70 hidden md:flex max-h-[80vh]">
            <div className="flex flex-col space-y-1 md:px-6 overflow-scroll max-h-[80vh] px-20">
                <h1 className="font-bold text-2xl w-full text-center py-5 hover:text-suGold cursor-pointer transition duration-150 ease-in-out">
                    <Link href="/categories">Explore Categories</Link>
                </h1>
                {categoryUrls.map((url) => (
                    <div
                        key={url}
                        className="shrink-0 w-full text-center my-auto"
                    >
                        <Link href={`/categories/category/${url}`}>
                            <h2 className="text-md hover:text-suGold hover:font-semibold cursor-pointer transition duration-150 ease-in-out">
                                {url
                                    .split("-")
                                    .map(
                                        (word: string) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                    )
                                    .join(" ")}
                            </h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

