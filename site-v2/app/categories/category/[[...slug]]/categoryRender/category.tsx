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
      <div className="grid grid-cols-12 grid-rows-9 gap-4 max-h-[80vh] gap-y-3 xl:px-10 grid-flow-row-dense ">
        <div className="col-span-10 row-span-2 col-start-2 z-30">
          <h1 className="font-bold text-center text-4xl pb-2">
            {categoryName}
          </h1>
          <p className="text-center text-medium leading-tight max-h-[10vh] overflow-hidden text-ellipsis hover:overflow-visible">
            {definition}
          </p>
        </div>
        <div className="col-span-3 col-start-1 row-start-3 row-span-7 ">
          <SideNav />
        </div>
        <div className="col-span-3 row-span-3 col-start-4 row-start-3">
          <Card className="bg-suMaroon dark:bg-suMaroon dark:bg-opacity-80 text-white h-full border-1 border-black dark:border-white rounded-tl-md rounded-tr-md rounded-bl-sm rounded-br-sm py-1 px-2 shadow-md shadow-black">
            <div className="px-3 pt-2 sticky top-0 z-10">
              <h2 className="text-medium md:text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 font-bold sticky">
                Personnel & Activity:
              </h2>
            </div>
            <ScrollShadow>
              <div className="px-4">
                <ul className="list-disc pl-2">
                  <li className="ml-2 md:ml-4 pb-3 pt-2">
                    <Link href={`/categories/category/${category}/faculty/`}>
                      <h3 className="text-white font-semibold md:font-normal text-sm md:text-xl underline leading-none hover:opacity-90 hover:text-suGold cursor-pointer transition duration-400 ease-in-out">
                        {faculty_count} Faculty
                      </h3>
                    </Link>
                    <ul>
                      <li className="ml-2 md:ml-4 py-1 text-lg">
                        {department_count} Departments
                      </li>
                    </ul>
                  </li>
                  <li className="ml-2 md:ml-4 py-1 text-lg">
                    <Link href={`/categories/category/${category}/articles/`}>
                      <h3 className="text-white font-semibold md:font-normal text-sm md:text-xl underline leading-none hover:opacity-90 hover:text-suGold cursor-pointer transition duration-400 ease-in-out">
                        {article_count} Articles
                      </h3>
                    </Link>
                    <ul>
                      <li className="ml-2 md:ml-4 py-1 text-lg">
                        {tc_count} Total Citations
                      </li>
                      <li className="ml-2 md:ml-4 py-1 mt-[-0.5em]">
                        {citation_average} Citation Per Article
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </ScrollShadow>
          </Card>
        </div>
        <div className="col-span-3 row-span-3 col-start-7 row-start-3">
          <Card className="bg-suMaroon dark:bg-suMaroon dark:bg-opacity-80 text-white h-full overflow-scroll border-1 border-black dark:border-white rounded-tl-md rounded-tr-md rounded-br-sm rounded-bl-sm shadow-md shadow-black">
            <div className="px-3 pt-2 sticky top-0 z-10">
              <h2 className="text-medium md:text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 font-bold sticky">
                Departments:
              </h2>
              <div className="px-4">
                <ul className="list-disc">
                  {departments.map((department) => (
                    <li className="ml-1 md:ml-2.5 py-2.5" key={department}>
                      <h3 className="text-white font-normal md:font-medium text-sm md:text-lg leading-none">
                        {department}
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-3 row-span-3 col-start-10 row-start-3">
          <Card className="bg-suMaroon dark:bg-suMaroon dark:bg-opacity-80 text-white h-full overflow-scroll border-1 border-black dark:border-white rounded-tl-sm rounded-tr-md rounded-bl-sm rounded-br-sm shadow-md shadow-black">
            <div className="px-3 pt-2 sticky top-0 z-10">
              <h2 className="text-medium md:text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 font-bold sticky">
                Research Themes:
              </h2>
              <div className="px-4">
                <ul className="list-disc">
                  {" "}
                  {th.map((theme) => (
                    <li className="ml-1 md:ml-2.5 py-0.5" key={theme}>
                      <h3 className="text-white font-normal md:font-medium text-sm md:text-lg leading-none">
                        {theme}
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-3 row-span-4 col-start-4 row-start-6">
          <Card className="bg-suMaroon dark:bg-suMaroon dark:bg-opacity-80 text-white h-full overflow-scroll border-1 border-black dark:border-white rounded-tl-sm rounded-tr-sm rounded-bl-md rounded-br-md shadow-md dark:shadow-gray-800 shadow-black">
            <div className="px-3 pt-2 sticky top-0 z-10">
              <h2 className="text-medium md:text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 font-bold sticky">
                Influential Faculty:
              </h2>
            </div>
            <ScrollShadow>
              <div className="px-4">
              <ul className="list-disc pl-1">
                  {facultyData
                    .slice(0, 4) // Take only the first 4 elements of the array
                    .map(({ name, article_count, total_citations }) => ( // Destructure the faculty object
                      <li className="ml-2 md:ml-4 py-1" key={name}>
                        <h3 className="text-white font-normal md:font-medium text-sm md:text-lg leading-none">
                          {name}
                          <br />
                          <span className="mt-[-0.5em] text-xs bg-clip-text text-transparent bg-white md:text-sm text-left opacity-90 italic font-normal block">
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
        <div className="col-span-6 row-span-4 col-start-7 row-start-6">
          <Card className="bg-suMaroon dark:bg-suMaroon dark:bg-opacity-80 text-white h-full overflow-scroll border-1 border-black dark:border-white rounded-tl-sm rounded-tr-sm rounded-bl-md rounded-br-md shadow-md dark:shadow-gray-800 shadow-black">
            <div className="px-3 pt-2 sticky top-0 z-10">
              <h2 className="text-medium md:text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-300 to-amber-200 font-bold sticky">
                Influential Articles
              </h2>
            </div>
            <ScrollShadow>
              <div className="px-4">
                <ul className="list-disc pl-1">
                  {articleData.sortedArticles.map(({ title, citations }) => (
                    <li className="ml-2 md:ml-4 py-2" key={title}>
                      <h3 className="text-white font-normal md:font-medium text-sm md:text-lg">
                        {title}{" "}
                        <span className="text-xs bg-clip-text text-transparent bg-white md:text-sm text-left opacity-90 italic font-normal">
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
    // <>
    //   <div className="flex flex-col items-center justify-center w-full py-5">
    //     <h1 className="text-3xl text-center">{categoryName}</h1>
    //   </div>

    //   <div className="grid grid-cols-12 grid-rows-12 gap-6 px-4 py-4">
    //     <Card className="bg-suMaroon col-span-6 dark:bg-suMaroon/70 text-white flex flex-row">
    //     <div className="p-4">
    //         <h2 className="text-2xl font-bold">Personnel & Activity:</h2>
    //         <ul className="pl-10 pt-3">
    //         <li className="pb-3 pt-2">
    //             <Link className="hover:text-suGold font-bold text-xl text-white block" href={`/categories/category/${category}/faculty/`}>
    //               <u> {faculty_count} Faculty</u>
    //             </Link>
    //             <ul className="pl-10 pt-1">
    //               <li className="text-white text-lg block">
    //                   {department_count} Departments
    //               </li>
    //             </ul>
    //           </li>
    //           <li className="pb-3 pt-3">
    //             <Link className="hover:text-suGold font-bold text-white text-xl block" href={`/categories/category/${category}/articles/`}>
    //               <u> {article_count} Articles</u>
    //             </Link>
    //             <ul className="pl-10 pt-1">
    //               <li className="text-white text-lg block">
    //                 {tc_count} Total Citations
    //               </li>
    //               <li className="text-white text-lg block">
    //                 {citation_average} Citation Per Article
    //               </li>
    //             </ul>
    //           </li>
    //         </ul>
    //       </div>
    //     </Card>
    //     <Card className="bg-suMaroon col-span-6  dark:bg-suMaroon/70 text-white font-bold">
    //       <div className="p-4">
    //         <h2 className="text-xl">Departments</h2>
    //         <ul>
    //           {departments.map((department) => (
    //             <li key={department}>{department}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     </Card>

    //     <Card className="bg-suMaroon col-span-5 dark:bg-suMaroon/70 text-white font-bold">
    //       <div className="p-4">
    //         <h2 className="text-xl">Themes</h2>
    //         <ul className="">
    //           {themes.map((theme) => (
    //             <li key={theme}>{theme}</li>
    //           ))}
    //         </ul>
    //       </div>
    //     </Card>

    //     <Card className="bg-suMaroon col-span-7 dark:bg-suMaroon/70 text-white font-bold">
    //         <div className="p-4">
    //             <h2 className="text-xl pb-3">
    //                 Influential Faculty
    //             </h2>
    //             <ul>
    //             {sortedFacultyData.map(([name, facultyData]) => (
    //                 <li className="pb-3" key={name}>
    //                     <div className="flex flex-col">
    //                         <h3 className="font-bold text-medium">{name}</h3>
    //                         <div className="flex justify-between text-md font-normal items-center">
    //                             <p>{facultyData.article_count} Publications, {facultyData.total_citations} Citations</p>
    //                         </div>
    //                     </div>
    //                 </li>
    //             ))}
    //             </ul>
    //         </div>
    //     </Card>
    //     <Card className="bg-suMaroon dark:bg-suMaroon/70 text-white font-bold col-span-1 md:col-span-2 lg:col-span-3">
    //       <div className="p-4">
    //         <h2 className="text-xl underline">
    //           <Link href={`/categories/category/${category}/articles/`}>
    //             Titles
    //           </Link>
    //         </h2>
    //         {/* Consider uncommenting and using the following if you have many titles to display */}
    //         {/* <ul className="overflow-y-auto max-h-60">
    //           {titles.map((title) => (
    //             <li key={title}>{title}</li>
    //           ))}
    //         </ul> */}
    //       </div>
    //     </Card>
    //   </div>
    // </>
  );
}
