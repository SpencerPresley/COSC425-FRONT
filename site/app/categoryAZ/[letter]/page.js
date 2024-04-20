
import { Themes } from "@/components/Research";
import { CatCard } from "@/components/catInfoCard";
import { CatAccord } from "@/components/catInfoAccord";
import { LabSpace } from "@/components/labSpace";
//import { useCatData } from "@/components/useCatData.server";
import { KeyFunded } from "@/components/keyFunded";
// import { useThemeData } from "@/components/useThemeData.server";
import { CardAZ } from "@/components/cardAZ"

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
      <span className="font-bold text-4xl text-center text-white flex flex-col justify-center">page action</span>
      <div className="overflow-scroll max-h-screen flex flex-col space-y-2 m-8">
      <div className="flex lg:flex-row flex-col shrink-0 border-zinc-500 w-full h-64 rounded-lg">
        <div className="shrink-0 bg-white border border-zinc-500 w-1/4 h-56 rounded-lg"></div>
        <div className="shrink-0 bg-white border border-zinc-500 w-1/4 h-56 rounded-lg"></div>
        <div className="shrink-0 bg-white border border-zinc-500 w-1/4 h-56 rounded-lg"></div>
        </div>
      </div>
      <div className="overflow-scroll max-h-screen flex flex-col space-y-2 m-8">
      <div className="flex lg:flex-row flex-col shrink-0 border-zinc-500 w-full h-64 rounded-lg content-around">
        <div className="shrink-0 bg-white border border-zinc-500 w-1/4 h-56 rounded-lg"></div>
        <div className="shrink-0 bg-white border border-zinc-500 w-1/4 h-56 rounded-lg"></div>
        <div className="shrink-0 bg-white border border-zinc-500 w-1/4 h-56 rounded-lg"></div>
        </div>
      </div>
      <div className="overflow-scroll max-h-screen flex flex-col space-y-2 m-8">
      <div className="flex lg:flex-row flex-col shrink-0 border border-zinc-500 w-full h-64 rounded-lg">
      <CardAZ 
                    title={categoryName}
                    count={faculty_count}
                    items={faculty}
                  />
        </div>
      </div>
    </div>
    )
}