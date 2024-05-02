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
  console.log(data);

  if (!data) {
    return <div>Faculty not found</div>;
  }

  const { categoryName, faculty, departments, titles } = data;

  return (
<div className="bg-black dark:bg-gray-500 flex flex-col items-center justify-center gap-4 text-white">
      <h1 className="text-3xl font-bold">{categoryName}</h1>
      <h2 className="text-2xl font-semibold">Faculty</h2>
      <ul className="overflow-hidden max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {faculty.sort().map((facultyMember: string) => (
          <li key={facultyMember}>{facultyMember}</li>
        ))}
      </ul>
    </div>
  );
}
