/* UTILITIES */
import { Link } from "@nextui-org/link";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
/* UI COMPONENTS */
import { Card } from "@nextui-org/card";
import { SideNav } from "@/components/componentsCategoryPage/side-nav";

/* CATEGORY INTERFACES */
import { CategoryObject, CategoryData, CategoryProps } from "@/types/index";

interface ArticleData {
  article_citation_map: CitationMap;
}

const managementData: ArticleData = {
  article_citation_map: {
    "The Effects of Expertise and Social Status on Team Member Influence and the Moderating Roles of Intragroup Conflicts": 7,
    "The Capacious Model and Leader Identity: An Integrative Framework": 3,
    "Customer courtesy and service performance: The roles of self-efficacy and social context": 2,
    "The balance between positive and negative affect in employee well-being": 8,
    "Watching you descend, I help others rise: the influence of leader humility on prosocial motivation": 2,
    "Self-Leadership and Psychological Capital as Key Cognitive Resources for Shaping Health-Protective Behaviors during the COVID-19 Pandemic": 29,
    "Responding to pandemic challenges: leadership lessons from multinational enterprises (MNEs) in India": 4,
    "Relationship conflict and counterproductive work behavior: the roles of affective well-being and emotional intelligence": 1,
    "Predictors of employees' strike attitudes in multinational corporations in China: a multilevel relational model": 0,
    "Rude customers and service performance: roles of motivation and personality": 18,
    "Changes in foreign ownership and innovation investment: the case of Korean corporate governance reforms": 1,
    "The rise of emerging Indian multinationals: strategic learning for EMNC foreign market entry and internationalization": 4,
    "R&D investment, intellectual capital, organizational learning, and firm performance: a study of Chinese software companies": 1,
    "Market performance and the loss aversion behind green management": 0,
    "Predicting supply chain risks through big data analytics: role of risk alert tool in mitigating business disruption": 7,
    "Managing environmental uncertainty for improved firm financial performance: the moderating role of supply chain risk management practices on managerial decision making": 22,
    "Patterns of alliances and acquisitions: An exploratory study": 0,
    "Do African resource rents promote rent-seeking at the expense of entrepreneurship?": 13,
    "IT Application Maturity, Management Institutional Capability and Process Management Capability": 27,
    "Modes of governance for market entry by international franchisors: factors affecting the choice": 2,
    "The effect of in-store electronic word of mouth on local competitor spillovers in the quick service restaurant industry": 0,
    "Internationalization and family firm performance A cross-cultural meta-analysis of the main effect and moderating factors": 10,
    "Stock market reactions to store-in-store agreements": 5,
    "Impact of strategic and operational risk management practices on firm performance: An empirical investigation": 20,
    "When CEO compensation plan based on risk changes firm strategic variation and strategic deviation? The moderating role of shareholder return": 0,
    "To Lead Is to Err: The Mediating Role of Attribution in the Relationship Between Leader Error and Leader Ratings": 8,
    "Entrepreneurial Processes and industry Development:The Case of Baltimore's Calming Entrepreneurs": 1,
    "U-shaped relationship between market liberalisation and technology exploration: evidence from South Korean firms": 0,
    "Relative Importance of Major Job Performance Dimensions in Determining Supervisors' Overall Job Performance Ratings": 6,
    "Managing the adverse effect of supply chain risk on corporate reputation: The mediating role of corporate social responsibility practices": 7,
    "Impact of Korean pro-market reforms on firm innovation strategies": 3,
    "The cross-cultural moderators of the influence of emotional intelligence on organizational citizenship behavior and counterproductive work behavior": 24,
    "Building supply chain risk resilience Role of big data analytics in supply chain disruption mitigation": 97,
    "Value of corporate political contributions from the investors' perspective": 0,
  },
};

interface CitationMap {
  [articleTitle: string]: number;
}

interface FacultyData {
  total_citations: number;
  article_count: number;
  average_citations: number;
  citation_map: {
    article_citation_map: CitationMap;
  };
}

interface FacultyDataset {
  [name: string]: FacultyData;
}

const facultyData: FacultyDataset = {
  "Munemo, Jonathan": {
    total_citations: 13,
    article_count: 1,
    average_citations: 13,
    citation_map: {
      article_citation_map: {
        "Do African resource rents promote rent-seeking at the expense of entrepreneurship?": 13,
      },
    },
  },
  "Hoffman, Richard": {
    total_citations: 2,
    article_count: 1,
    average_citations: 2,
    citation_map: {
      article_citation_map: {
        "Modes of governance for market entry by international franchisors: factors affecting the choice": 2,
      },
    },
  },
  "Sen, Argha": {
    total_citations: 0,
    article_count: 1,
    average_citations: 0,
    citation_map: {
      article_citation_map: {
        "The effect of in-store electronic word of mouth on local competitor spillovers in the quick service restaurant industry": 0,
      },
    },
  },
  "Pasirayi, Simbarashe": {
    total_citations: 5,
    article_count: 1,
    average_citations: 5,
    citation_map: {
      article_citation_map: {
        "Stock market reactions to store-in-store agreements": 5,
      },
    },
  },
  "Leonel, Ronei": {
    total_citations: 0,
    article_count: 1,
    average_citations: 0,
    citation_map: {
      article_citation_map: {
        "When CEO compensation plan based on risk changes firm strategic variation and strategic deviation? The moderating role of shareholder return": 0,
      },
    },
  },
};

/* No singleton pattern necessary.
   Next.js fetch() automatically memoizes data 
   */

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

  const sortedFacultyData = Object.entries(facultyData).sort(
    (a, b) => b[1].total_citations - a[1].total_citations
  );

  const sortedArticles = Object.entries(managementData.article_citation_map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <>
      <div className="grid grid-cols-12 grid-rows-9 gap-4 max-h-[80vh] gap-y-3 xl:px-10 grid-flow-row-dense ">
        <div className="col-span-10 row-span-2 col-start-2">
          <h1 className="font-bold text-center text-4xl pb-1">
            {categoryName}
          </h1>
          <p className="text-center md:text-medium font-normal leading-normal">
            &ldquo;the study and design of intelligent agents&rdquo; where an
            intelligent agent is a system that perceives its environment and
            takes actions that maximize its chances of success. John McCarthy,
            who coined the term in 1955, defines it as &ldquo;the science and
            engineering of making intelligent machines.&rdquo;
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
                  {themes.slice(0, 5).map((theme) => (
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
                  {sortedFacultyData.map(([name, facultyData]) => (
                    <li className="ml-2 md:ml-4 py-1" key={name}>
                      <h3 className="text-white font-normal md:font-medium text-sm md:text-lg leading-none">
                        {name}
                        <br />
                        <span className="mt-[-0.5em] text-xs bg-clip-text text-transparent bg-white md:text-sm text-left opacity-90 italic font-normal block">
                          {facultyData.article_count}{" "}
                          {facultyData.article_count === 1
                            ? "Article"
                            : "Articles"}
                          , {facultyData.total_citations} Citations
                        </span>
                      </h3>
                      {/* <p className="text-xs bg-clip-text text-transparent bg-white md:text-sm text-left opacity-90 italic font-normal pt-0 mt-0">
                    {facultyData.article_count} {facultyData.article_count === 1 ? "Article" : "Articles"},{" "}
                    {facultyData.total_citations} Citations
                    </p> */}
                    </li>
                  ))}
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
                  {sortedArticles.map(([title, citations]) => (
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
