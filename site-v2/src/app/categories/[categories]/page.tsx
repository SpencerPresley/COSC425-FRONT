import fetchCategoryData from "@/lib/categoryData/fetchCategoryData";
import { Card } from "@/components/componentsCategoryPage/card";

interface CategoryData {
    categoryName: string;
    url: string;
    faculty_count: number;
    department_count: number;
    article_count: number;
    faculty: string[];
    departments: string[];
    titles: string[];
}

// interface Props {
//     data: CategoryObject;
// }

/* 
    This function is used to generate the static parameters for the category page.

    It fetches the category data, maps the urls to the category names
    for page generation.

    Returns full data for rest of page to use.
*/
export async function generateStaticParams() {
    const data = await fetchCategoryData();

    return {
        paths: Object.entries(data).map(([categoryName, categoryData]) => ({
            props: {
                params: {
                    category: categoryData.url,
                },
                data: {
                    categoryName,
                    ...categoryData,
                },
            },
        })),
        fallback: false,
    };
}

export default async function Page({ data }: { data: CategoryData }) {
    const {
        categoryName,
        faculty_count,
        department_count,
        article_count,
        faculty,
        departments,
        titles,
    } = data

    const themes = [
        "Resilience Training",
        "Job Satisfaction",
        "Turnover Intentions",
        "Role Stressors",
        "Stress Arousal",
        "Burnout",
    ];

    return (
        <div className="bg-black border rounded-xl border-cyan-500 shadow-xl shadow-cyan-700 w-full h-full flex flex-col space-y-4 pt-10 pb-10 px-10">
            <span className="font-bold text-4xl text-center text-white flex flex-col justify-center">
                {categoryName}
            </span>
            {/* <Card 
                title={"faculty"}
                count={categoryData.faculty_count}
                items={categoryData.faculty}
      
                />
              <Card 
                title={"Departments"}
                        count={categoryData.department_count}
                        items={categoryData.departments}
                      /> */}
            <div className="overflow-scroll max-h-screen flex flex-col space-y-2 w-full">
                <div className="flex lg:flex-row flex-col shrink-0 border-zinc-500 w-full lg:h-64 h-full rounded-lg  text-white">
                    <Card
                        title={"Faculty"}
                        count={faculty_count}
                        items={faculty}
                    />
                </div>
                <div className="shrink-0 border-zinc-500 w-full h-64 rounded-lg text-white">
                    <Card
                        title={"Departments"}
                        count={department_count}
                        items={departments}
                    />
                </div>
                <div className="overflow-scroll shrink-0 w-full h-64 rounded-lg text-white">
                    <Card
                        title={"Articles"}
                        count={article_count}
                        items={titles}
                    />
                </div>
                <div className="shrink-0 w-full h-64 rounded-lg">
                    <div className="overflow-scroll max-h-full text-center text-white">
                        <h4>Theme</h4>
                        <ul>
                            {themes.map((theme, index) => (
                                <li key={index}>{theme}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
