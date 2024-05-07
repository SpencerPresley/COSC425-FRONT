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
    tc_count: number;
    citation_average: number;
    themes: string[];
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
  tc_count: number;
  citation_average: number;
  themes: string[];
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
    tc_count,
    citation_average,
    themes,
  } = data;

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full py-5">
        <h1 className="text-3xl font-bold text-center">{categoryName}</h1>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-4">
        <Card className="bg-suMaroon dark:bg-suMaroon/70 text-white font-bold">
          <div className="p-4">
            <h2 className="text-xl">Counts</h2>
            <Link className="hover:text-suGold block" href={`/categories/category/${category}/faculty/`}>
              Faculty Count: {faculty_count}
            </Link>
            <Link className="hover:text-suGold block" href={`/categories/category/${category}/faculty/`}>
              Department Count: {department_count}
            </Link>
            <Link className="hover:text-suGold block" href={`/categories/category/${category}/articles/`}>
              Article Count: {article_count}
            </Link>
          </div>
        </Card>
  
        <Card className="bg-suMaroon dark:bg-suMaroon/70 text-white font-bold">
          <div className="p-4">
            <h2 className="text-xl">Departments</h2>
            <ul>
              {departments.map((department) => (
                <li key={department}>{department}</li>
              ))}
            </ul>
          </div>
        </Card>
  
        <Card className="bg-suMaroon dark:bg-suMaroon/70 text-white font-bold">
          <div className="p-4">
            <h2 className="text-xl">Themes</h2>
            <ul className="space-y-2 overflow-y-auto max-h-60">
              {themes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
          </div>
        </Card>
  
        <Card className="bg-suMaroon dark:bg-suMaroon/70 text-white font-bold col-span-1 md:col-span-2 lg:col-span-3">
          <div className="p-4">
            <h2 className="text-xl underline">
              <Link href={`/categories/category/${category}/articles/`}>
                Titles
              </Link>
            </h2>
            {/* Consider uncommenting and using the following if you have many titles to display */}
            {/* <ul className="overflow-y-auto max-h-60">
              {titles.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul> */}
          </div>
        </Card>
      </div>
    </>
  );
}
