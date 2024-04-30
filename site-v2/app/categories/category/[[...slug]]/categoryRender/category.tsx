/* UTILITIES */
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { siteConfig } from "@/config/site";

/* UI COMPONENTS */
import { Card } from "@nextui-org/card";
import { button as buttonStyles } from "@nextui-org/theme";
import { Code } from "@nextui-org/code";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";


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
    category: string
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

async function getCategoryData(category: any) {
    const data = await fetchS3Data();

    const categoryEntry = Object.entries(data).find(
        ([_, itemData]) => itemData.url === category
    );

    if (categoryEntry) {
        const [categoryName, categoryData] = categoryEntry;
        return { categoryName, ...categoryData };
    }

    return null;
}

export  async function RenderCategory ({ category }: CategoryProps) {
    const data = await getCategoryData(category);
    // console.log(data);
  
    if (!data) {
      return <div>Faculty not found</div>;
    }
  
    const {
        categoryName,
        faculty_count,
        department_count,
        article_count,
        faculty,
        departments,
        titles,
    } = data;

    const themes = [
        "Resilience Training",
        "Job Satisfaction",
        "Turnover Intentions",
        "Role Stressors",
        "Stress Arousal",
        "Burnout",
    ];

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
                    <div className=" p-4" key={faculty_count}>
                        <p>Faculty Count: <Link href={`/categories/category/${category}/faculty/`}>{faculty_count}</Link></p>
                        <p>Department Count: {department_count}</p>
                        <p>Article Count: <Link href={`/categories/category/${category}/articles/`}>{article_count}</Link></p>
                    </div>
                </Card>
                <Card>
                <div className="row-span-1 p-4">
                    <h2 className="flex justify-center"> Departments</h2>
                    <ul>
                        {departments.map((department) => (
                            <li key={department}>{department}</li>
                        ))}
                    </ul>
                </div>
                </Card>

                <Card>
                <div className="row-span-1  p-4" >
                    <h2 className="flex justify-center underline"><Link href={`/categories/category/${category}/faculty/`}>Faculty</Link></h2>
                    {/* <ul className="overflow-hidden max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {faculty.map((faculty) => (
                            <li>{faculty}</li>
                        ))}
                    </ul> */}
                </div>
                </Card>

                <Card>
                <div className="row-span-1 col-span-1 p-4">
                    <h2 className="flex justify-center underline"><Link href={`/categories/category/${category}/articles/`}>Titles</Link></h2>
                    {/* <ul className="overflow-hidden max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {titles.map((title) => (
                            <li>{title}</li>
                        ))}
                    </ul> */}
                </div>
                </Card>
                </div>
        </section>
    );
}