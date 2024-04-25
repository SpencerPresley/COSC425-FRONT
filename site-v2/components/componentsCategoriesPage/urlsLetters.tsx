import Link from "next/link";

export const UrlsLetters = () => {
    const url = "/categories/";

    /* creates an array of all the aphabetical characters.
    split('') is a method that splits a string into an array of characters. */
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");

    return (
        <div>
            <Link href={`${url}all`}>
                {" "}
                <strong>All</strong>{" "}
            </Link>
            {letters.map((letter) => (
                <>
                    <Link
                        key={letter}
                        href={`${url}${letter}`}
                    >
                        {letter}
                    </Link>{" "}
                </>
            ))}
        </div>
    );
};
