import { Themes } from "@/components/Research"
import { CatCard } from "@/components/catInfoCard"
import { CatAccord } from '@/components/catInfoAccord';
import { LabSpace } from '@/components/labSpace'
import { useCatData } from "@/components/useCatData.server";
import { KeyFunded } from "@/components/keyFunded";
import { useThemeData } from "@/components/useThemeData.server";
  
export default async function page({ params }) {
    const getCategory = async () => {
        const res = await fetch('http://localhost:3000/api/'+String(params.category));
        return res.json(res);
    }
    const data2 = await getCategory();

    return (
        <div>
            {/* mt-10 = 10px margin top */}
            {/* mx-10 = 10px margin left and right */}
            {/* m-20 = 20px margin all around */}

            {/* Standard practice is 12 columns and you divide them how you want so i changed that */}
            {/* row-span-2 = take up 2 rows out of 5 */}
            {/* col-span-2 = take up 2 columns out of 12*/}
            <div className="grid grid-rows-8 grid-cols-5 gap-4 grid-flow-row-dense mt-10 mx-10 m-20 h-dvh">
                <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-4 sm:row-span-3 row-span-2 sm:col-span-5 col-span-5">
                    <div className="overflow-scroll max-h-full">
                        <CatAccord data={data2}/>
                    </div>
                </div>
                <div className="bg-gold-gradient text-white font-bold rounded-lg shadow-xl flex justify-center p-4 row-span-3 col-span-5">
                    <div className="overflow-scroll max-h-full">
                        <Themes data={data2} />
                    </div>
                </div>
                <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-4 row-span-2 col-span-5">
                    <div className="overflow-scroll max-h-full">
                        <LabSpace />
                    </div>
                </div>
                <div className="bg-gold-gradient text-white font-bold rounded-lg shadow-xl flex justify-center p-4 row-span-2 col-span-5 ">
                    <div className="overflow-scroll max-h-full">
                        <LabSpace />
                    </div>
                </div>
                <div className="bg-suMaroon text-white rounded-lg shadow-xl p-4 col-span-5 row-span-2">
                    <div className="overflow-scroll max-h-full">
                        <KeyFunded/>
                    </div>
                </div>
                <div className="bg-suMaroon rounded-lg shadow-xl flex justify-center p-4 col-span-5">
                    <div className="overflow-scroll max-h-full">
                        <LabSpace />
                    </div>
                </div>
            </div>
        </div>
    );
}