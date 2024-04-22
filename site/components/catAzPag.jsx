import Link from "next/link";//sets up router links

export const CatAZPag = () => {//allows user to dynamically route to the pages when selecting a filter
    const url = '/categoryAZ/';//initializes beginning url data 
    const letters = [...'abcdefghijklmnopqrstuvwxyz'];//holds all lettert data
    return (
        // gives a gold band for more bold/contrast for easier readability
        <div className="text-base font-bold text-center text-black flex flex-col justify-center bg-gold-end">
                <div>
                {/* beggining portion of the filter */}
                    Pages:  | 
                     {/*sets up the defualt page for cat Az page  */}
                    <Link href={`${url}all`} className="hover:text-gray-500">|   all   |</Link>
                    {/* goes through each entry to display the letter and allow the user to select which letter they want to dynamically route to */}
                    {letters.map((letter) => (
                        <Link key={letter} href={`${url}${letter}`} className="hover:text-gray-500">|   {letter}   |</Link>
                    ))}
                    |
                </div>
        </div>
    )
}