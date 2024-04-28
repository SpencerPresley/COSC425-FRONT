
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

let S3_DATA: CategoryObject | null = null;

async function fetchS3Data() {
    // if (S3_DATA !== null) {
    //     console.log("USING CACHED DATA");
    //     return S3_DATA;
    // }

    // console.log("FETCHING UNCACHED DATA");
    const data = (await fetch(
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    ).then((res) => res.json())) as CategoryObject;

    S3_DATA = data;
    return data;
}

async function getCategoryData(category: any) {
    // const data = (await fetch(
    //     "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    // ).then((res) => res.json())) as CategoryObject;

    const data = await fetchS3Data();

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

export async function generateStaticParams() {
    const data = (await fetch(
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    ).then((res) => res.json())) as CategoryObject;

    return Object.keys(data).map((category) => ({
        articles: data[category].url // This matches the dynamic segment name expected in the file path
    }));
}

export default async function Page ({ params }: { params: { articles: any } }) {
    const { articles } = params;
    const data = await getCategoryData(articles);

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
<div className="bg-black dark:bg-gray-500 flex flex-col items-center justify-center gap-4 text-white">
    <h2 className="text-3xl font-bold"> Article List</h2>
    <ul className="overflow-hidden max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {titles.map((title, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
                {title}
            </li>
        ))}
    </ul>
</div>


    );
}

