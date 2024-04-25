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

export async function generateStaticParams() {
    const data = (await fetch(
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    ).then((res) => res.json())) as Record<string, CategoryData>;
    // console.log(data);

    // Object.entries(data).map(([_, categoryData]) => {
    //   console.log(categoryData.url);
    // })

    return Object.keys(data).map((category) => ({
        category: data[category].url, // This matches the dynamic segment name expected in the file path
    }));
}

async function getCategoryData(category: any) {
    const data = (await fetch(
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    ).then((res) => res.json())) as CategoryObject;

    // Find the category object based on the 'url' property
    const categoryEntry = Object.entries(data).find(
        ([_, itemData]) => itemData.url === category
    );

    if (categoryEntry) {
        const [categoryName, categoryData] = categoryEntry;
        return { categoryName, ...categoryData };
    }

    return null;
}

export default async function Page({
    params,
}: {
    params: { category: any };
}) {
    const { category } = params;
    console.log(category);
    const data = await getCategoryData(category);
    console.log(data);

    if (!data) {
        return <div>NOT FOUND</div>;
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
}
