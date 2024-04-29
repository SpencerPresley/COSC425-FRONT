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

    console.log("Category: ", category);
    // Find the category object based on the 'url' property
    const categoryEntry = Object.entries(data).find(
        ([categoryName, categoryData]) => categoryData.url === category
    );

    if (!categoryEntry) {
        console.log("Category not found");
        return null;
    }

    console.log(categoryEntry[0]);
    console.log(categoryEntry[1]);

    return { categoryEntry: categoryEntry[1] };
}

export async function Faculty({ category }: FacultyProps) {
  const data = await getFacultyData(category);
  console.log(data);

  if (!data) {
    return <div>Faculty not found</div>;
  }

  const { categoryEntry: faculty } = data;

  return (
    <div>
      <h1>{category}</h1>
      <h2>Faculty</h2>
      <ul>
        {faculty.faculty.map((facultyMember: string) => (
          <li key={facultyMember}>{facultyMember}</li>
        ))}
      </ul>
    </div>
  );
}
