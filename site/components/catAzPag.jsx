import Link from "next/link";

export const CatAZPag = () => {
    const url = '/categoryAZ/';
    const letters = [...'abcdefghijklmnopqrstuvwxyz'];
    return (
        <div className="font-bold text-4xl text-center text-white flex flex-col justify-center">
            <div>
                <Link href={`${url}all`} className="hover:text-gray-300">all </Link>
                {letters.map((letter) => (
                    <Link key={letter} href={`${url}${letter}`} className="hover:text-gray-300">{letter} </Link>
                ))}

            </div>
        </div>
    )
}