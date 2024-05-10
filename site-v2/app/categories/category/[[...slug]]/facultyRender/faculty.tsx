
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

interface FacultyProps {
  category: string;
  categoryName: string;
}

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

export async function Faculty({ category, categoryName }: FacultyProps) {
  const data = await getCategoryData(category);
  // console.log(data);

  if (!data) {
    return <div>Faculty not found</div>;
  }

  const { departments, titles } = data;

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
    <div className="bg-gray-300 dark:bg-gray-800 flex flex-col items-center justify-center gap-6 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-suMaroon dark:text-suGold">{categoryName}</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-900 dark:text-white">Faculty - Sorted by Total Citations</h2>
      <div className="grid grid-cols-3 gap-4">
  {facultyData
    .sort((a, b) => b.total_citations - a.total_citations || b.average_citations - a.average_citations)
    .map((facultyMember) => {
      const { name, total_citations, article_count, average_citations } = facultyMember;
      return (
        <div key={name} className="mb-2 bg-gray-50 hover:bg-gray-100 hover:shadow-lg p-4 dark:bg-suMaroon/90 dark:text-suGold rounded-lg shadow">
          <div className="font-bold text-suMaroon dark:text-suGold">{name}</div>
          <div className="text-gray-900 dark:text-white/90">Total Citations: {total_citations}</div>
          <div className="text-gray-900 dark:text-white/90">Article Count: {article_count}</div>
          <div className="text-gray-900 dark:text-white/90">Average Citations: {average_citations.toFixed(2)}</div>
        </div>
      );
    })}
</div>
      <h2 className="text-2xl font-semibold mt-4 text-suMaroon">Departments</h2>
      <ul className="text-gray-900 dark:text-white/90 list-disc pl-5 max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {departments.sort().map((department: string) => (
          <li key={department} className="mb-2">
            {department}
          </li>
        ))}
      </ul>
    </div>
  );
}
