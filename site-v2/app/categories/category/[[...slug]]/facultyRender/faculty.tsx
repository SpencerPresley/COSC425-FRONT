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

interface FacultyProps {
  category: string;
}

async function fetchS3Data() {
  const data = (await fetch(
    "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
  ).then((res) => res.json())) as CategoryObject;
  return data;
}

async function getFacultyData(category: string) {
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

export async function Faculty({ category }: FacultyProps) {
  const data = await getFacultyData(category);
  // console.log(data);

  if (!data) {
    return <div>Faculty not found</div>;
  }

  const { categoryName, faculty, departments, titles } = data;

  return (
    <div>
      <div className="bg-suMaroon dark:bg-suMaroon/95 justify-center gap-6 text-white p-6 rounded-lg shadow-lg border-3 border-black mb-5">
      <h1 className="text-4xl font-bold text-center">{categoryName}</h1>
      </div>
    
<div className="flex flex-row justify-center gap-12">
  {/* First Card - Faculty */}
  <Card className="bg-suMaroon dark:bg-suMaroon/95 flex flex-col items-center justify-center gap-6 text-white p-6 rounded-lg shadow-lg border-3 border-black">
    
    <h2 className="text-2xl font-semibold mt-4">Faculty</h2>
    <ul className="list-disc pl-5 max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {faculty.sort().map((facultyMember: string) => (
        <li key={facultyMember} className="mb-2">
          {facultyMember}
        </li>
      ))}
    </ul>
  </Card>

  {/* Second Card - Departments */}
  <Card className="bg-suMaroon dark:bg-suMaroon/95 flex flex-col items-center justify-center gap-6 text-white p-6 rounded-lg shadow-lg border-3 border-black">
    <h2 className="text-2xl font-semibold mt-4">Departments</h2>
    <ul className="list-disc pl-5 max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {departments.sort().map((department: string) => (
        <li key={department} className="mb-2">
          {department}
        </li>
      ))}
    </ul>
  </Card>
</div>
</div>
  );
}
