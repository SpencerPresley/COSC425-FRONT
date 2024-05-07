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
  category: string;
}

/* No singleton pattern necessary.
   Next.js fetch() automatically memoizes data 
   */

async function fetchS3Data() {
  const data = (await fetch(
    "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
  ).then((res) => res.json())) as CategoryObject;

  console.log(data);
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

export async function RenderCategory({ category }: CategoryProps) {
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
    <>
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-2xl font-bold">{categoryName}</h1>
      </div>
      {/* <div className="bg-background dark:bg-background border ">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold">{categoryName}</h1>
                </div>
            </div> */}
      {/* grid-flow-row-dense */}
      <div className="grid grid-cols-12 grid-rows-6 px-4 gap-10 w-full py-7">
        <Card className="dark:bg-suMaroon/70 bg-suMaroon text-white font-bold w-full col-span-6 px-2">
          <div className=" p-4" key={faculty_count}>
            <Link
              className="hover:text-suGold text-white"
              href={`/categories/category/${category}/faculty/`}
            >
              Faculty Count: {faculty_count}
            </Link>

            <Link
              className="hover:text-suGold text-white"
              href={`/categories/category/${category}/faculty/`}
            >
              Department Count: {department_count}
            </Link>

            <Link
              className="hover:text-suGold text-white"
              href={`/categories/category/${category}/articles/`}
            >
              Article Count:
              {article_count}
            </Link>
          </div>
        </Card>
        <Card className="dark:bg-suMaroon/70 bg-suMaroon text-white font-bold w-full col-span-6 px-2">
          <div className="row-span-1 p-4">
            <h2 className="flex justify-center"> Departments</h2>
            <ul>
              {departments.map((department) => (
                <li key={department}>{department}</li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="dark:bg-suMaroon/70 bg-suMaroon text-white font-bold w-full col-span-6 px-2">
          <div className="row-span-1  p-4">
            <h2 className="flex justify-center underline">
              <Link href={`/categories/category/${category}/faculty/`}>
                Faculty
              </Link>
            </h2>
            {/* <ul className="overflow-hidden max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {faculty.map((faculty) => (
                            <li>{faculty}</li>
                        ))}
                    </ul> */}
          </div>
        </Card>

        <Card className="dark:bg-suMaroon/70 bg-suMaroon text-white font-bold w-full col-span-6 px-2">
          <div className="row-span-1 col-span-1 p-4">
            <h2 className="flex justify-center underline">
              <Link href={`/categories/category/${category}/articles/`}>
                Titles
              </Link>
            </h2>
            {/* <ul className="overflow-hidden max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {titles.map((title) => (
                            <li>{title}</li>
                        ))}
                    </ul> */}
          </div>
        </Card>
      </div>
    </>
  );
}
