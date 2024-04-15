import { Themes } from "@/components/Research"
import { CatCard } from "@/components/catInfoCard"
import { CatAccord } from '@/components/catInfoAccord';
import { LabSpace } from '@/components/labSpace'
import { useCatData } from "@/components/useCatData.server";
import { KeyFunded } from "@/components/keyFunded";
import { useThemeData } from "@/components/useThemeData.server";
  
export default function page() {
    const data = useCatData();
    // const themedata = useThemeData();

    return (
        <div>
            {/* mt-10 = 10px margin top */}
            {/* mx-10 = 10px margin left and right */}
            {/* m-20 = 20px margin all around */}

            {/* Standard practice is 12 columns and you divide them how you want so i changed that */}
            {/* row-span-2 = take up 2 rows out of 5 */}
            {/* col-span-2 = take up 2 columns out of 12*/}
            <div className="grid grid-rows-5 grid-cols-3 gap-4 grid-flow-row-dense mt-10 mx-10 m-20">
                <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-4 row-span-2">
                    <CatAccord data={data}/>
                </div>
                <div className="bg-yellow-500 text-white font-bold rounded-lg shadow-xl flex justify-center p-4 col-span-2">
                    <LabSpace />
                </div>
                <div className="bg-pink-500 text-white font-bold rounded-lg shadow-xl flex justify-center p-4 col-span-2 row-span-2">
                    <LabSpace />
                </div>
                <div className="bg-suMaroon text-white font-bold rounded-lg shadow-xl flex justify-center p-4 row-span-2">
                    <Themes data={data} />
                </div>
                <div className="bg-suMaroon text-white rounded-lg shadow-xl p-4 col-span-2 row-span-2">
                    <KeyFunded/>
                </div>
                <div className="bg-suMaroon rounded-lg shadow-xl flex justify-center p-4">
                    <LabSpace />
                </div>
            </div>
        </div>
    );
}