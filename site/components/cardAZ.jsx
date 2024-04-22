import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

export const CardAZ = ({ 
    title,
    facultyCount,
    departmentCount,
    articleCount,
    url,
    }) => {
    return (
        <div className=" rounded-lg w-1/4 max-h-20 flex flex-col p-10 text-lg text-white">
            <Accordion type="single" collapsible>
                <AccordionItem  value="title"className="border-none rounded-lg min-h-24 outline outline-3 outline-su-dark-grey bg-su-light-grey">
                    <AccordionTrigger className="text-center">{title}</AccordionTrigger>
                    <div className="max-h-full w-full rounded-lg">
                        <AccordionContent className="text-center underline">{facultyCount} Faculty</AccordionContent>
                        <AccordionContent className="text-center underline">{departmentCount} Department</AccordionContent>
                        <AccordionContent className="text-center underline">{articleCount} Article</AccordionContent>
                        <AccordionContent className="text-right underline mx-8"><Link href={`/category/${url}`} className="hover:text-blue-300 text-blue-500">Link</Link></AccordionContent>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    )
}