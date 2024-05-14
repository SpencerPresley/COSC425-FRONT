import Link from 'next/link';
import { ScrollShadow } from '@nextui-org/scroll-shadow';

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
    'http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json'
  ).then((res) => res.json())) as CategoryObject;
  return data;
}

export async function SideNav() {
  const categoryUrls = await getUrls();

  return (
    <div className="md:w-full border-1 border-black  dark:border-white rounded-r-sm rounded-b-xs rounded-br-xs rounded-tr-xs rounded-tl-xl rounded-bl-xl text-white dark:text-white bg-suMaroon dark:bg-suMaroon dark:bg-opacity-80 hidden lg:flex max-h-[63.5vh] shadow-md shadow-black">
      <div className="flex  flex-col space-y-1 md:px-6 overflow-scroll px-20">
        <div className="sticky top-0 z-10">
          <h1 className="opacity-100 font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 text-xl w-full text-center pt-3  pb-1 hover:opacity-60 cursor-pointer transition duration-400 ease-in-out">
            <Link href="/categories">Explore Categories</Link>
          </h1>
        </div>
        <ScrollShadow>
          {categoryUrls.map((url) => (
            <div key={url} className="shrink-0 w-full text-center my-auto">
              <Link href={`/categories/category/${url}`}>
                <h2 className="text-md hover:text-suGold font-medium cursor-pointer transition duration-150 ease-in-out">
                  {url
                    .split('-')
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(' ')}
                </h2>
              </Link>
            </div>
          ))}
        </ScrollShadow>
      </div>
    </div>
  );
}
