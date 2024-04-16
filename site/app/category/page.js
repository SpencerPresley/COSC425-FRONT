import { CatCard } from "@/components/catInfoCard"
import { useThemeData } from "@/components/useThemeData.server";
export default function page() {
    const themedata = useThemeData();

    return(
        <div>
            <CatCard themedata={themedata}/>
        </div>
    );
};
