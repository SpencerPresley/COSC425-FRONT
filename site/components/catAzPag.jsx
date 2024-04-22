import Link from "next/link";

export const CatAZPag = () => {
    const url = '/categoryAZ/';
    const letters = [...'abcdefghijklmnopqrstuvwxyz'];
    return (
        <div className="text-base font-bold text-center text-black flex flex-col justify-center bg-gold-end">
                <div>
                    Pages:  |  
                    <Link href={`${url}all`} className="hover:text-gray-500">|   all   |</Link>
                    
                    {letters.map((letter) => (
                        <Link key={letter} href={`${url}${letter}`} className="hover:text-gray-500">|   {letter}   |</Link>
                    ))}
                    |
                </div>
        </div>
    )
}