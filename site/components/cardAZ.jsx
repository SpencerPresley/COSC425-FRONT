import Link from "next/link";//sets up router link
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";//gets accordian components

export const CardAZ = ({ //card that displays the topic data passed as variables
    title,
    facultyCount,
    departmentCount,
    articleCount,
    url,
    }) => {
    return (
        // create a colum space to hold the card data
        <div className=" rounded-lg w-1/4 max-h-20 flex flex-col p-10 text-lg text-white">
            {/* create simple accordian action to display data */}
            <Accordion type="single" collapsible>
                <AccordionItem  value="title"className="border-none rounded-lg min-h-24 outline outline-3 outline-su-dark-grey bg-su-light-grey">
                    {/* showcases the topic as a trigger for the dropdown*/}
                    <AccordionTrigger className="text-center">{title}</AccordionTrigger>
                    <div className="max-h-full w-full rounded-lg">
                        {/* holds the content to showcase when trigger activates */}
                        {/* sowaces the faculty, department, and article count */}
                        <AccordionContent className="text-center underline">{facultyCount} Faculty</AccordionContent>
                        <AccordionContent className="text-center underline">{departmentCount} Department</AccordionContent>
                        <AccordionContent className="text-center underline">{articleCount} Article</AccordionContent>
                        {/* this dynamically routes to the topic page when user wants to see more specific data */}
                        <AccordionContent className="text-right underline mx-8"><Link href={`/category/${url}`} className="hover:text-blue-300 text-blue-500">Link</Link></AccordionContent>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    )
}