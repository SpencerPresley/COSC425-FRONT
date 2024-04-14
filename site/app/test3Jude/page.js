import { Themes } from "@/components/Research"
import { CatCard } from "@/components/catInfoCard"
import { CatAccord } from '@/components/catInfoAccord';
import { CatTitle } from '@/components/catTitleCard';
import { InfluencialFaculty } from '@/components/influencialFaculty';
import { InfluencialArticle } from '@/components/influencialArticle';
import { LabSpace } from '@/components/labSpace'
import { useCatData } from "@/components/useCatData.server";
import { KeyFunded } from "@/components/keyFunded";
  
export default function page() {
    const data = useCatData();

    return (
        <div>
            <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-20 row-span-2 mx-[20%]">
                    <CatTitle data={data}/>
                </div>
            <div className="grid grid-rows-5 grid-cols-2 gap-4 grid-flow-row-dense mt-10 mx-[20%] m-20 ">
                <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-2 row-span-2 ">
                    <CatAccord data={data}/>
                </div>
                <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-2 col-span-1">
                    <InfluencialFaculty />
                </div>
                <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-2 col-span-1 row-span-2">
                    <Themes />
                </div>
                <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-2 row-span-2 ">
                    <InfluencialArticle />
                </div>
                <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-2 col-span-1 row-span-2">
                    <KeyFunded/>
                </div>
                <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-2">
                    <LabSpace />
                </div>
            </div>
        </div>
    );
}