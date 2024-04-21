import Link from "next/link";

export const CatAZPage = () => {
    const url = '/categoryAZ/';
    return (
        <div className="font-bold text-4xl text-center text-white flex flex-col justify-center">
            <div>
                <Link href={`${url}all`} className="hover:text-gray-300">all </Link>
                <Link href={`${url}a`} className="hover:text-gray-300">a </Link>
                <Link href={`${url}b`} className="hover:text-gray-300">b </Link>
                <Link href={`${url}c`} className="hover:text-gray-300">c </Link>
                <Link href={`${url}d`} className="hover:text-gray-300">d </Link>
                <Link href={`${url}e`} className="hover:text-gray-300">e </Link>
                <Link href={`${url}f`} className="hover:text-gray-300">f </Link>
                <Link href={`${url}g`} className="hover:text-gray-300">g </Link>
                <Link href={`${url}h`} className="hover:text-gray-300">h </Link>
                <Link href={`${url}i`} className="hover:text-gray-300">i </Link>
                <Link href={`${url}j`} className="hover:text-gray-300">j </Link>
                <Link href={`${url}k`} className="hover:text-gray-300">k </Link>
                <Link href={`${url}l`} className="hover:text-gray-300">l </Link>
                <Link href={`${url}m`} className="hover:text-gray-300">m </Link>
                <Link href={`${url}n`} className="hover:text-gray-300">n </Link>
                <Link href={`${url}o`} className="hover:text-gray-300">o </Link>
                <Link href={`${url}p`} className="hover:text-gray-300">p </Link>
                <Link href={`${url}q`} className="hover:text-gray-300">q </Link>
                <Link href={`${url}r`} className="hover:text-gray-300">r </Link>
                <Link href={`${url}s`} className="hover:text-gray-300">s </Link>
                <Link href={`${url}t`} className="hover:text-gray-300">t </Link>
                <Link href={`${url}u`} className="hover:text-gray-300">u </Link>
                <Link href={`${url}v`} className="hover:text-gray-300">v </Link>
                <Link href={`${url}w`} className="hover:text-gray-300">w </Link>
                <Link href={`${url}x`} className="hover:text-gray-300">x </Link>
                <Link href={`${url}y`} className="hover:text-gray-300">y </Link>
                <Link href={`${url}z`} className="hover:text-gray-300">z </Link>

            </div>
        </div>
    )
}