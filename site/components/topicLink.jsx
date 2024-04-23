import Link from "next/link";//sets up router link

export const TopicLink = ({ //card that displays the topic name with it also being linked
    title,
    url,
    }) => {
    return (
        // create a colum space to hold the card name and link
        <div className="">
            <Link href={`/category/${url}`} className="">{title}</Link>

        </div>
    )
}