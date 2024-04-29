
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
        <>
            <ul>
                <li>
                    {titles.map((title) => (
                        <div key={title}>
                            <h2>{title}</h2>
                        </div>
                    ))}
                </li>
            </ul>
        </>
    );
}

