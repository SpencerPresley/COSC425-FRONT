import { Card } from "@/components/componentsCategoryPage/card";

/*
    File to fetch the category data from the S3 bucket

    Singleton pattern ensures only one fetch happens. 
    
    If the data is already fetched, it will return the promise.
*/

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

// let jsonData: any = null;

// function fetchCategoryData () {
//   if (!jsonData) {
//       jsonData = fetch(
//           "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
//       ).then((res) => res.json());
//   }
//   return jsonData;
// }

// function getDataForSegment(categoryUrlSegment: string): CategoryData {
//   if (!dataPromise) {
//     throw new Error("Data not fetched yet");
//   }

//   // Assuming dataPromise is already resolved and contains the actual data
//   const data = Object.entries(dataPromise).find(([_, categoryData]) => categoryData.url === categoryUrlSegment);

//   if (!data) {
//     throw new Error("Category data not found for the given URL segment");
//   }

//   const [categoryName, categoryDetails] = data;

//   // Construct the CategoryData object
//   const categoryData: CategoryData = {
//     categoryName: categoryName,
//     url: categoryDetails.url,
//     faculty_count: categoryDetails.faculty_count,
//     department_count: categoryDetails.department_count,
//     article_count: categoryDetails.article_count,
//     faculty: categoryDetails.faculty,
//     departments: categoryDetails.departments,
//     titles: categoryDetails.titles
//   };
//   return categoryData;
// }

interface CategoryData {
    url: string;
    faculty_count: number;
    department_count: number;
    article_count: number;
    faculty: string[];
    departments: string[];
    titles: string[];
}



interface Props {
  params: { categories: string };
  data: CategoryData;
}

// interface PageParams {
//     url: string;
//     data: {
//         categoryName: string;
//         url: string;
//         faculty_count: number;
//         department_count: number;
//         article_count: number;
//         faculty: string[];
//         departments: string[];
//         titles: string[];
//       };
// }

export async function generateStaticParams() {
  const data = await fetch(
      "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
  ).then((res) => res.json()) as Record<string, CategoryData>;

  Object.entries(data).map(([_, categoryData]) => {
    console.log(categoryData.url);
  })

  return Object.entries(data).map(([_, categoryData]) => ({
      params: {
          categories: categoryData.url, // This matches the dynamic segment name expected in the file path
      },
  }));
}


// data: {
//   categoryName,
//   url: categoryData.url,
//   faculty_count: categoryData.faculty_count,
//   department_count: categoryData.department_count,
//   article_count: categoryData.article_count,
//   faculty: categoryData.faculty,
//   departments: categoryData.departments,
//   titles: categoryData.titles,
// },

async function getCategoryData(categories: string) {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json()) as CategoryObject;
  // Find the category object based on the 'url' property
  const categoryEntry = Object.entries(data).find(([_, itemData]) => itemData.url === categories);

  if (categoryEntry) {
    const [categoryName, categoryData] = categoryEntry;
    return { categoryName, ...categoryData };
  }

  return null;
}


export default async function Page({ params }: { params: { categories: string } }) {
  const { categories } = params;
  console.log(categories);
  const data = await getCategoryData(categories);
  console.log(data);

  if (!data) {
    return <div>NOT FOUND</div>
  }

  const {
    categoryName,
    faculty_count,
    department_count,
    article_count,
    faculty,
    departments,
    titles,
  } = data;

  return (
    <div>
        <h1>{categoryName}</h1>
        <p>Faculty Count: {faculty_count}</p>
        <p>Department Count: {department_count}</p>
        <p>Article Count: {article_count}</p>
        <h2>Faculty</h2>
        {faculty.map((facultyName) => (
            <p key={facultyName}>{facultyName}</p>
        ))}
        <h2>Departments</h2>
        {departments.map((departmentName) => (
            <p key={departmentName}>{departmentName}</p>
        ))}
        <h2>Titles</h2>
        {titles.map((title) => (
            <p key={title}>{title}</p>
        ))}
    </div>
  );
};