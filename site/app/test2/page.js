import { Themes } from "@/components/Research"
import { CatCard } from "@/components/catInfoCard"
import { CatAccord } from "@/components/catInfoAccord"
import fsPrommises from 'fs/promises';
import path from 'path';


export async function getStaticProps() {
    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'public/test2.json');
    
    // Read the JSON file
    const jsonData =await fsPrommises.readFile(filePath)
    const data = JSON.parse(jsonData);
  
    // Pass the items array to the page via props
    return objectData
}

  
export default function page({items}) {
  return (
    <div>
        <div className="grid grid-rows-5 grid-cols-3 gap-4 grid-flow-row-dense pl-20 pr-20">
            <div className="bg-red-500 text-white font-bold rounded-lg shadow-xl flex justify-center p-4 row-span-2">
                <CatAccord data={items} />
            </div>
            <div className="bg-yellow-500 text-white font-bold rounded-lg shadow-xl flex justify-center p-4 col-span-2">
                <Themes />
            </div>
            <div className="bg-pink-500 text-white font-bold rounded-lg shadow-xl flex justify-center p-4 col-span-2 row-span-2">
                <Themes />
            </div>
            <div className="bg-orange-500 text-white font-bold rounded-lg shadow-xl flex justify-center p-4 row-span-2">
                <Themes />
            </div>
            <div className="bg-green-500 text-white font-bold rounded-lg shadow-xl flex justify-center p-4 col-span-2 row-span-2">
                <Themes />
            </div>
            <div className="bg-cyan-500 text-white font-bold rounded-lg shadow-xl flex justify-center p-4">
                <Themes />
            </div>
        </div>
    </div>
  );
}

