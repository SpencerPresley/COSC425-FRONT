
import Link from "next/link";
export const Card = ({ 
    title,
    count,
    items,
    }) => {
    return (
        <div className="rounded-lg h-full w-screen md:w-full text-center flex flex-col p-1">
            <div className=" flex flex-col h-full w-full">
                <div className="basis-1/4">
                    ({count}) {title}
                </div>
                <div className="basis-3/4 columns-3"> 
                    {items.map((member, index) => (
                    <div key={index}>{member}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}