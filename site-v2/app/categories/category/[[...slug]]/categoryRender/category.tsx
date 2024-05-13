/* UTILITIES */
import { Link } from "@nextui-org/link";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
/* UI COMPONENTS */
import { Card } from "@nextui-org/card";
import { SideNav } from "@/components/componentsCategoryPage/side-nav";

/* CATEGORY INTERFACES */
import { CategoryObject, CategoryData, CategoryProps } from "@/types/index";

interface CategoryArticleData {
  [categoryName: string]: ArticleData;  // Maps category names to their data
}

interface ArticleData {
  article_citation_map: CitationMap;
}

interface ArticleInfo {
  title: string;
  citations: number;
}

interface CitationMap {
  [articleTitle: string]: number;  // Maps article titles to their citation counts
}

interface FacultyData {
  total_citations: number;
  article_count: number;
  average_citations: number;
  citation_map: {
    article_citation_map: CitationMap;
  };
}

interface CategoryFacultyStats {
  faculty_stats: {
    [facultyName: string]: FacultyData;
  };
}

interface FacultyDataset {
  [categoryName: string]: CategoryFacultyStats;
}

/* No singleton pattern necessary.
   Next.js fetch() automatically memoizes data 
   */

/* START CATEGORY DATA FETCHING */
async function fetchS3Data() {
  const data = (await fetch(
    "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
  ).then((res) => res.json())) as CategoryObject;

  // console.log(data);
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
/* END CATEGORY DATA FETCHING */

/* START ARTICLE FETCHING */
async function fetchArticleData() {
  const data = (await fetch(
    "https://cosc425-category-data.s3.us-east-2.amazonaws.com/processed_article_stats_data.json"
  ).then((res) => res.json())) as CategoryArticleData;

  // console.log(data);
  return data;
}


async function getArticleData(categoryName: string) {
  const data = await fetchArticleData();
  const articleData = data[categoryName] as ArticleData;

  const sortedArticles = Object.entries((articleData as ArticleData).article_citation_map)
    .sort((a, b) => b[1] - a[1])
    .map(([title, citations]): ArticleInfo => ({ title, citations }))
    .slice(0, 3);

  return {
    sortedArticles
  };
}
/* END ARTICLE FETCHING */


/* START FACULTY FETCHING */
async function fetchFacultyData() {
  const data = (await fetch(
    "https://cosc425-category-data.s3.us-east-2.amazonaws.com/processed_faculty_stats_data.json"
  ).then((res) => res.json())) as FacultyDataset;

  // console.log(data);
  return data;
}

async function getFacultyData(categoryName: string) {
  const data = await fetchFacultyData();
  const categoryFacultyStats = data[categoryName]?.faculty_stats;

  if (!categoryFacultyStats || Object.keys(categoryFacultyStats).length === 0) {
    // Handle the case where there is no faculty data
    return [{
      name: "No faculty currently available, check back later.",
      total_citations: 0,
      article_count: 0,
      average_citations: 0,
      citation_map: {
        article_citation_map: {}
      }
    }];
  }

  // If faculty data exists, transform it into an array of FacultyData objects
  const sortedFacultyData = Object.entries(categoryFacultyStats)
    .map(([name, facultyData]) => ({
      name,
      ...facultyData
    }))
    .sort((a, b) => b.total_citations - a.total_citations);

  return sortedFacultyData;
}
/* END FACULTY FETCHING */

export async function RenderCategory({ category }: CategoryProps) {
  const data = await getCategoryData(category);
  // console.log(data);

  if (!data) {
    return <div>Category not found</div>;
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
    definition,
  } = data;

  if (department_count === 0) {
    departments.push("No departments currently available, check back later.");
  }

  if (definition === undefined) {
    let definition = "Definition coming soon.";
  }

  let th = null;
  if (themes === undefined) {
    th =["No themes currently available, check back later."];
  } else if (themes.length < 5) {
    th = themes;
  } else {
    th = themes.slice(0, 5);
  }

  let articleData = await getArticleData(categoryName);

  if (!articleData) {
    articleData = {
      sortedArticles: [{ title: "No articles currently available, check back later.", citations: 0 }]
    }
  }

  const { sortedArticles: articleInfo } = articleData;

  let facultyData = await getFacultyData(categoryName);

  if (facultyData.length === 0) {
    facultyData = [{
      name: "No faculty currently available, check back later.",
      total_citations: 0,
      article_count: 0,
      average_citations: 0,
      citation_map: {
        article_citation_map: {}
      }
    }];
  } else {
    // Destructure the first faculty member's data if facultyData is not empty
    const [firstFacultyMember] = facultyData;
    const { name, total_citations, article_count, average_citations, citation_map } = firstFacultyMember;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-9 gap-4 md:max-h-[85vh] gap-y-3 xl:px-10 grid-flow-row-dense">
        <div className="col-span-1 lg:col-span-10 lg:row-span-2 col-start-1 lg:col-start-2 z-30">
          <h1 className="font-bold text-center text-4xl pb-2">
            {categoryName}
          </h1>
          <p className="text-center text-medium leading-tight lg:max-h-[10vh] overflow-hidden text-ellipsis hover:overflow-visible">
            {definition}
          </p>
        </div>
        <div className="col-span-1 lg:col-span-3 lg:row-start-3 lg:row-span-7">
          <SideNav />
        </div>
        <div className="col-span-1 lg:col-span-3 lg:row-span-3 lg:col-start-4 lg:row-start-3">
          <Card className="bg-suMaroon dark:bg-suMaroon dark:bg-opacity-80 text-white h-full border-1 border-black dark:border-white rounded-tl-md rounded-tr-md rounded-bl-sm rounded-br-sm py-1 px-2 shadow-md shadow-black">
          <div className="px-4 pt-2 sticky top-0 z-10">
              <h2 className="text-center md:text-left text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 font-bold sticky">
                Personnel & Activity
              </h2>
            </div>
            <ScrollShadow>
            <div className="px-4 mb-1">
            <ul className="md:list-disc text-center md:text-left md:pl-6">
  <li className="pb-3 pt-2">
    <Link href={`/categories/category/${category}/faculty/`}>
      <h3 className="text-white font-normal text-lg underline leading-none hover:opacity-90 hover:text-suGold cursor-pointer transition duration-400 ease-in-out">
        {faculty_count} Faculty
      </h3>
    </Link>
    <ul className="md:list-disc md:pl-6 text-center md:text-left">
      <li className="py-1 text-medium">
        {department_count} Departments
      </li>
    </ul>
  </li>
</ul>
<ul className="md:list-disc text-center md:text-left md:pl-6">
  <li className="pb-3">
    <Link href={`/categories/category/${category}/articles/`}>
    <h3 className="text-white font-normal text-lg underline leading-none hover:opacity-90 hover:text-suGold cursor-pointer transition duration-400 ease-in-out">
        {article_count} Articles
      </h3>
    </Link>
    <ul className="md:list-disc md:pl-6 text-center md:text-left">
      <li className="text-medium pt-1">
        {tc_count} Total Citations
      </li>
      <li className="pb-1 pt-0.5 text-medium">
        {citation_average} Citation Per Article
      </li>
    </ul>
  </li>
</ul>
              </div>
            </ScrollShadow>
          </Card>
        </div>
        <div className="col-span-1 lg:col-span-3 lg:row-span-3 lg:col-start-7 lg:row-start-3">
          <Card className="bg-suMaroon dark:bg-suMaroon dark:bg-opacity-80 text-white h-full overflow-scroll border-1 border-black dark:border-white rounded-tl-md rounded-tr-md rounded-br-sm rounded-bl-sm shadow-md shadow-black">
          <div className="px-4 pt-2 sticky top-0 z-10">
              <h2 className="text-center md:text-left text-medium md:text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 font-bold sticky">
                Departments
              </h2>
              </div>
              <div className="px-4 mb-1">
                <ul className="md:list-disc md:pl-1 md:mt-1 text-center md:text-left">
                  {departments.map((department) => (
                    <li className="py-1 md:ml-3" key={department}>
                      <h3 className="text-white font-normal md:font-medium text-medium">
                      {department}
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
        <div className="col-span-1 lg:col-span-3 lg:row-span-3 lg:col-start-10 lg:row-start-3">
          <Card className="bg-suMaroon dark:bg-suMaroon dark:bg-opacity-80 text-white h-full overflow-scroll border-1 border-black dark:border-white rounded-tl-sm rounded-tr-md rounded-bl-sm rounded-br-sm shadow-md shadow-black">
          <div className="px-4 pt-2 sticky top-0 z-10">
              <h2 className="text-center md:text-left text-medium md:text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 font-bold sticky">
                Research Themes
              </h2>
              <div className="px-4 mb-1">
                <ul className="md:list-disc md:pl-1 text-center md:text-left">
                  {th.map((theme) => (
                    <li className="py-1" key={theme}>
                      <h3 className="text-white font-normal md:font-medium text-medium">
                        {theme}
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-1 lg:col-span-3 lg:row-span-4 lg:col-start-4 lg:row-start-6">
        <Card className="bg-suMaroon dark:bg-suMaroon dark:bg-opacity-80 text-white h-full md:overflow-scroll border-1 border-black dark:border-white rounded-tl-sm rounded-tr-sm rounded-bl-md rounded-br-md shadow-md dark:shadow-gray-800 shadow-black">
            <div className="px-4 pt-2 sticky top-0 z-10">
              <h2 className="text-center md:text-left text-medium md:text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 font-bold sticky">
                Influential Faculty
              </h2>
            </div>
            <ScrollShadow>
            <div className="px-4 mb-2">
                <ul className="md:list-disc md:pl-1 text-center md:text-left">
                  {facultyData
                    .slice(0, 4) // Take only the first 4 elements of the array
                    .map(({ name, article_count, total_citations }) => ( // Destructure the faculty object
                      <li className="md:ml-4 py-1" key={name}>
                        <h3 className="text-white font-normal md:font-medium text-medium md:text-lg leading-none">
                          {name}
                          <br />
                          <span className="text-xs bg-clip-text text-transparent bg-white md:text-sm opacity-90 italic font-normal block">
                            {article_count} {article_count === 1 ? "Article" : "Articles"}, {total_citations} Citations
                          </span>
                        </h3>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </ScrollShadow>
          </Card>
        </div>
        <div className="col-span-1 lg:col-span-6 lg:row-span-4 lg:col-start-7 lg:row-start-6">
          <Card className="bg-suMaroon dark:bg-suMaroon dark:bg-opacity-80 text-white h-full overflow-scroll border-1 border-black dark:border-white rounded-tl-sm rounded-tr-sm rounded-bl-md rounded-br-md shadow-md dark:shadow-gray-800 shadow-black">
          <div className="px-4 pt-2 sticky top-0 z-10">
              <h2 className="text-center md:text-left text-medium md:text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 font-bold sticky">
                Influential Articles
              </h2>
            </div>
            <ScrollShadow>
            <div className="px-4 mb-2">
                <ul className="ml-10 mr-10 md:ml-0 md:mr-0 md:list-disc md:pl-1 text-center md:text-left">
                  {articleData.sortedArticles.map(({ title, citations }) => (
                    <li className="ml-2 md:ml-4 py-2" key={title}>
                    <h3 className="text-white font-normal md:font-medium text-sm md:text-lg">
                      {title}{" "}
                      <span className="block md:inline text-xs bg-clip-text text-transparent bg-white md:text-sm text-center md:text-left opacity-90 italic font-normal">
                        ({citations} citations)
                      </span>
                    </h3>
                  </li>
                  ))}
                </ul>
              </div>
            </ScrollShadow>
          </Card>
        </div>
      </div>
    </>
  );

}
