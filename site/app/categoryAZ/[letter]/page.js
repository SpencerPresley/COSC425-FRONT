
import { Themes } from "@/components/Research";
import { CatCard } from "@/components/catInfoCard";
import { CatAccord } from "@/components/catInfoAccord";
import { LabSpace } from "@/components/labSpace";
//import { useCatData } from "@/components/useCatData.server";
import { KeyFunded } from "@/components/keyFunded";
// import { useThemeData } from "@/components/useThemeData.server";
import { Card } from "@/components/Card"

export async function generateStaticParams() {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());

  return Object.keys(data).map((letter) => ({
    letter: data[letter].url,
  }));
}

async function getletterData(letter) {
    const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());
  
    // Find the letter object based on the 'url' property
    const letterEntry = Object.entries(data).find(([_, item]) => item.url === letter);
  
    if (letterEntry) {
      const [categoryName, letterData] = letterEntry;
      return { categoryName, ...letterData };
    }
  
    return null;
  }

  export default async function Page({ params }) {
    const { letter } = params;
    const letterData = await getletterData(letter);
  
    if (!letterData) {
      // Handle the case when letterData is undefined
      return <div>Letter not found</div>;
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
    } = letterData
  
    return (
          <div className="bg-suMaroon w-full h-full flex flex-col space-y-4">
              <span className="font-bold text-4xl text-center text-white flex flex-col justify-center">{categoryName}</span>
              <div className="overflow-scroll max-h-screen flex flex-col space-y-2">
                <div className="flex lg:flex-row flex-col shrink-0 bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg">
                  <Card 
                    title={"faculty"}
                    count={letterData.faculty_count}
                    items={letterData.faculty}
                  />
                  <Card 
                    title={"Departments"}
                    count={letterData.department_count}
                    items={letterData.departments}
                  />
                  <Card 
                    title={"Articles"}
                    count={letterData.article_count}
                    items={letterData.titles}
                  />
                </div>
                <div className="shrink-0 bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg">
                    <div className="overflow-scroll max-h-full text-center">
                      <h4>Theme</h4>
                        <ul>
                            {themes.map((theme, index)=>(
                                <li key={index}>{theme}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="shrink-0 bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
                <div className="shrink-0 bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
                <div className="shrink-0 bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
                <div className="shrink-0 bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
                <div className="shrink-0 bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
                <div className="shrink-0 bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
                <div className="shrink-0 bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
                <div className="shrink-0 bg-white border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
              </div>
          </div>
    )
  }


// spencer Style

// export default async function Page({ params }) {
//   const { letter } = params;
//   const letterData = await getletterData(letter);

//   const themes = ["Resilience Training","Job Satisfaction","Turnover Intentions","Role Stressors","Stress Arousal","Burnout"];

//   if (!letterData) {
//     // Handle the case when letterData is undefined
//     return <div>letter not found</div>;
//   }

//   const {
//     letterName,
//     faculty_count,
//     department_count,
//     article_count,
//     faculty,
//     departments,
//     titles
//   } = letterData

//   return (
//     <div className="py-10 px-5 lg:px-20">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* letter Name Card */}
//         <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-suMaroon text-white font-bold rounded-lg shadow-2xl p-6 flex justify-center items-center">
//           <h1 className="text-2xl md:text-3xl">{letterName}</h1>
//         </div>
  
//         {/* letter Accord Card */}
//         <div className="bg-white text-gray-800 rounded-lg shadow-2xl overflow-hidden">
//           <div className="p-6">
//             <CatAccord
//               facultyCount={letterData.faculty_count}
//               departmentCount={letterData.department_count}
//               articleCount={letterData.article_count}
//               faculty={letterData.faculty}
//               departments={letterData.departments}
//               titles={letterData.titles}
//             />
//           </div>educational
//         </div>
  
//         {/* Placeholder for Themes - Uncomment and use when ready */}
//         {/* <div className="bg-gold-gradient text-white rounded-lg shadow-2xl p-6 overflow-hidden">
//           <Themes themes={themes} />
//         </div> */}
  
//         {/* Lab Space Cards */}
//         <div className="bg-suMaroon text-white rounded-lg shadow-2xl p-6 overflow-hidden">
//           <LabSpace />
//         </div>
//         <div className="bg-gold-gradient text-white rounded-lg shadow-2xl p-6 overflow-hidden">
//           <LabSpace />
//         </div>
  
//         {/* Key Funded Card */}
//         <div className="bg-white text-gray-800 rounded-lg shadow-2xl p-6 overflow-hidden col-span-1 md:col-span-2">
//           <KeyFunded />
//         </div>
  
//         {/* Additional Lab Space Card if needed */}
//         <div className="bg-suMaroon text-white rounded-lg shadow-2xl p-6 overflow-hidden">
//           <LabSpace />
//         </div>
//       </div>
//     </div>
//   );
// };


