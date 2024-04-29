import { Card } from "@nextui-org/card";
import { button as buttonStyles } from "@nextui-org/theme";
import { Code } from "@nextui-org/code";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
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

  return data;
}

async function getUrls() {
    const data = await fetchS3Data();
    
    return Object.values(data).map((item) => item.url).sort();
}

export default async function CategoriesPage() {
    const urls = await getUrls();
    console.log(urls);

  if (!urls) {
    return <div>Loading...</div>;
  }

  return <>
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-3xl font-bold pb-10">Categories</h1>
        <div className="grid grid-cols-1 gap-4">
          {urls.map((url) => (
              <Card key={url} className="p-4">
                <h2 className="text-xl font-bold"><Link href={`/categories/category/${url}`}>{url}</Link></h2>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </>;
}
