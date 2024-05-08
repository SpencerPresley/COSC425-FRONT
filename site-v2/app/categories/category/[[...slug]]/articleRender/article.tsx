import { Card } from "@nextui-org/card";

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

interface ArticleProps {
  category: string;
}

async function fetchS3Data() {
  const data = (await fetch(
    "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
  ).then((res) => res.json())) as CategoryObject;
  return data;
}

async function getArticleData(category: string) {
  const data = await fetchS3Data();

  // Find the category object based on the 'url' property
  const categoryEntry = Object.entries(data).find(
    ([, categoryData]) => categoryData.url === category
  );

  if (!categoryEntry) {
    console.log("Category not found");
    return null;
  }

  const [categoryName, categoryData] = categoryEntry;

  return { categoryName, ...categoryData };
}

export async function Articles({ category }: ArticleProps) {
  // console.log("Articles Category: ", category)
  const data = await getArticleData(category);
  // console.log("Return: ", data);

  if (!data) {
    return <div>Articles not found</div>;
  }

  const { categoryName, faculty, departments, titles } = data;

  return (
<Card className="bg-suMaroon dark:bg-suMaroon/95 text-white h-full border-3 border-black dark:border-white rounded-lg flex flex-col items-center">
  <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 pb-1 text-center">
    {categoryName}
  </h1>
  <h2 className="text-3xl font-semibold text-center">Articles</h2>
  <ul className="list-disc pl-5 max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mt-2 text-xl">
    {titles.sort().map((title: string) => (
      <li key={title} className="mb-2 text-white">
        {title}
      </li>
    ))}
  </ul>
</Card>

  );
}
