import Link from "next/link";//sets up router link

export const TopicLink = ({ //card that displays the topic name with it also being linked
    title,
    url,
    }) => {
    return (
        // create a colum space to hold the card name and link
        <div className="flex justify-center items-center border-2 border-su-dark-grey bg-su-light-grey min-h-20 max-h-20 min-w-60 max-w-60 text-white m-5 text-center shadow-2xl shadow-su-extra-dark-grey rounded-lg hover:underline">
            <Link href={`/category/${url}`} className="">{title}</Link>

        </div>
    )
}