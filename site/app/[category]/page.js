import { Themes } from "@/components/Research";
import { CatCard } from "@/components/catInfoCard";
import { CatAccord } from "@/components/catInfoAccord";
import { LabSpace } from "@/components/labSpace";
import { useCatData } from "@/components/useCatData.server";
import { KeyFunded } from "@/components/keyFunded";
import { useThemeData } from "@/components/useThemeData.server";

export async function generateStaticParams() {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());

  return Object.keys(data).map((category) => ({
    category: data[category].url,
  }));
}

async function getCategoryData(category) {
    const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());
  
    // Find the category object based on the 'url' property
    const categoryEntry = Object.entries(data).find(([_, item]) => item.url === category);
  
    if (categoryEntry) {
      const [categoryName, categoryData] = categoryEntry;
      return { categoryName, ...categoryData };
    }
  
    return null;
  }

export default async function Page({ params }) {
  const { category } = params;
  const categoryData = await getCategoryData(category);

  if (!categoryData) {
    // Handle the case when categoryData is undefined
    return <div>Category not found</div>;
  }

  const themes = ["Resilience Training","Job Satisfaction","Turnover Intentions","Role Stressors","Stress Arousal","Burnout"];

  const {
    categoryName,
    faculty_count,
    department_count,
    article_count,
    faculty,
    departments,
    titles
  } = categoryData

  return (
    // <div>
    //     {/* mt-10 = 10px margin top */}
    //     {/* mx-10 = 10px margin left and right */}
    //     {/* m-20 = 20px margin all around */}

    //     {/* Standard practice is 12 columns and you divide them how you want so i changed that */}
    //     {/* row-span-2 = take up 2 rows out of 5 */}
    //     {/* col-span-2 = take up 2 columns out of 12*/}
    //     <div className="grid grid-rows-8 grid-cols-5 gap-4 grid-flow-row-dense mt-10 mx-10 m-20 h-dvh">
    //         <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-4 sm:row-span-3 row-span-2 sm:col-span-5 col-span-5">
    //             <div className="bg-suMaroon text-white font-black rounded-lg shadow-xl flex justify-center p-4 sm:col-span-5"><h1>{categoryName}</h1></div>
    //             <div className="overflow-scroll max-h-full">
    //                 <CatAccord
    //                     facultyCount={categoryData.faculty_count}
    //                     departmentCount={categoryData.department_count}
    //                     articleCount={categoryData.article_count}
    //                     faculty={categoryData.faculty}
    //                     departments={categoryData.departments}
    //                     titles={categoryData.titles}
    //                 />
    //             </div>
    //         </div>
    //         <div className="bg-gold-gradient text-white font-bold rounded-lg shadow-xl flex justify-center p-4 row-span-3 col-span-5">
    //             <div className="overflow-scroll max-h-full">
    //                 {/* <Themes 
    //                     themes={themes}
    //                 /> */}
    //                 ({console.log(categoryData)})
    //             </div>
    //         </div>
    //         <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-4 row-span-2 col-span-5">
    //             <div className="overflow-scroll max-h-full">
    //                 <LabSpace />
    //             </div>
    //         </div>
    //         <div className="bg-gold-gradient text-white font-bold rounded-lg shadow-xl flex justify-center p-4 row-span-2 col-span-5 ">
    //             <div className="overflow-scroll max-h-full">
    //                 <LabSpace />
    //             </div>
    //         </div>
    //         <div className="bg-suMaroon text-white rounded-lg shadow-xl p-4 col-span-5 row-span-2">
    //             <div className="overflow-scroll max-h-full">
    //                 <KeyFunded/>
    //             </div>
    //         </div>
    //         <div className="bg-suMaroon rounded-lg shadow-xl flex justify-center p-4 col-span-5">
    //             <div className="overflow-scroll max-h-full">
    //                 <LabSpace />
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <>
        <div className="bg-suMaroon w-full h-full">
            <span className="font-bold text-4xl">Home</span>
            <div className="bg-white border-solid border border-zinc-500 w-full h-12 rounded-lg">
            <div className="bg-white text-white font-black rounded-lg shadow-xl flex justify-center p-4 sm:col-span-5"><h1>{categoryName}</h1></div>
            </div>
            <div className="bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg">
                <div className="overflow-scroll max-h-full">
                    <CatAccord
                        facultyCount={categoryData.faculty_count}
                        departmentCount={categoryData.department_count}
                        articleCount={categoryData.article_count}
                        faculty={categoryData.faculty}
                        departments={categoryData.departments}
                        titles={categoryData.titles}
                    />
                </div>
            </div>
            <div className="bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg">
                <div className="overflow-scroll max-h-full text-center">
                    <ul>
                        {themes.map((theme, index)=>(
                            <li key={index}>{theme}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
            <div className="bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
            <div className="bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
        </div>
  </>
  );
}