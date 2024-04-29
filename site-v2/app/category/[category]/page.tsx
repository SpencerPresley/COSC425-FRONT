import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Card } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";


/*
    File to fetch the category data from the S3 bucket

    Singleton pattern ensures only one fetch happens. 
    
    If the data is already fetched, it will return the promise.
*/

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

interface Props {
    params: { categories: string };
    data: CategoryData;
}

let S3_DATA: CategoryObject | null = null;

async function fetchS3Data() {
    // if (S3_DATA !== null) {
    //     console.log("USING CACHED DATA");
    //     return S3_DATA;
    // }

    // console.log("FETCHING UNCACHED DATA");
    const data = (await fetch(
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    ).then((res) => res.json())) as CategoryObject;

    S3_DATA = data;
    return data;
}

export async function generateStaticParams() {
    const data = (await fetch(
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    ).then((res) => res.json())) as CategoryObject;

    return Object.keys(data).map((category) => ({
        category: data[category].url, // This matches the dynamic segment name expected in the file path
    }));
}

async function getCategoryData(category: any) {
    // const data = (await fetch(
    //     "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    // ).then((res) => res.json())) as CategoryObject;

    const data = await fetchS3Data();

    // Find the category object based on the 'url' property
    const categoryEntry = Object.entries(data).find(
        ([_, itemData]) => itemData.url === category
    );

    if (categoryEntry) {
        const [categoryName, categoryData] = categoryEntry;
        return { categoryName, ...categoryData };
    }

    return null;
}

export default async function Page({ params }: { params: { category: any } }) {
    const { category } = params;
    // console.log(category);
    const data = await getCategoryData(category);
    // console.log(data);

    if (!data) {
        return <div>NOT FOUND</div>;
    }

    const themes = [
        "Resilience Training",
        "Job Satisfaction",
        "Turnover Intentions",
        "Role Stressors",
        "Stress Arousal",
        "Burnout",
    ];

    const {
        categoryName,
        faculty_count,
        department_count,
        article_count,
        faculty,
        departments,
        titles,
    } = data;

    return (
        <section className="bg-black  dark:bg-gray-500 flex flex-col items-center justify-center gap-4 text-white">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className="text-2xl font-bold">
                    {categoryName}
                </h1>
            </div>
            {/* <div className="bg-background dark:bg-background border ">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold">{categoryName}</h1>
                </div>
            </div> */}

            <div className="grid grid-rows-3 grid-cols-2 grid-flow-row-dense text-white gap-x-7 gap-y-8 pb-3">
                <Card>
                    <div className=" p-4 ">
                        <p>Faculty Count: <Link href={`/category/${category}/faculty/${category}`}>{faculty_count}</Link></p>
                        <p>Department Count: {department_count}</p>
                        <p>Article Count: <Link href={`/category/${category}/articles/${category}`}>{article_count}</Link></p>
                    </div>
                </Card>
                <Card>
                <div className="row-span-1 p-4">
                    <h2 className="flex justify-center"> Departments</h2>
                    <ul>
                        {departments.map((department) => (
                            <li>{department}</li>
                        ))}
                    </ul>
                </div>
                </Card>
                
                <Card>
                <div className="row-span-1  p-4" >
                    <h2 className="flex justify-center underline"><Link href={`/category/${category}/faculty/${category}`}>Faculty</Link></h2>
                    {/* <ul className="overflow-hidden max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {faculty.map((faculty) => (
                            <li>{faculty}</li>
                        ))}
                    </ul> */}
                </div>
                </Card>
                <Card>
                <div className="row-span-1 col-span-1 p-4">
                    <h2 className="flex justify-center underline"><Link href={`/category/${category}/articles/${category}`}>Titles</Link></h2>
                    {/* <ul className="overflow-hidden max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {titles.map((title) => (
                            <li>{title}</li>
                        ))}
                    </ul> */}
                </div>
                </Card>
                {/* <Card>
                    <div className="row-span-1 col-span-2">
                    <h2 className="flex justify-center underline"><Link href={`/category/${category}/themes/${category}`}>Themes</Link></h2>
                    </div>
                </Card> */}
                
            </div>
        </section>
    );
}
