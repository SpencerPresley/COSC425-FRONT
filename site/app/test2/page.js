import { Themes } from "@/components/Research"
import { CatCard } from "@/components/catInfoCard"
import { CatAccord } from '@/components/catInfoAccord';
import { labSpace } from '@components/LabSpace'
import { useCatData } from "@/components/useCatData.server";
  
export default function page() {
    const data = useCatData();

    return (
        <div>
            <div className="grid grid-rows-5 grid-cols-3 gap-4 grid-flow-row-dense pl-20 pr-20">
                <div className="bg-red-500 text-white font-bold rounded-lg shadow-xl flex justify-center p-4 row-span-2">
                    <CatAccord data={data}/>
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
                <div className="bg-cyan-500 rounded-lg shadow-xl flex justify-center p-4">
                    <labSpace />
                </div>
            </div>
        </div>
    );
}

