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
        <div className=" rounded-lg w-1/4 max-h-20 flex flex-col p-10 text-lg">
            <Accordion type="single" collapsible>
                <AccordionItem value="title"className="border-none rounded-lg bg-white">
                    <AccordionTrigger>{title}</AccordionTrigger>
                    <div className="max-h-full w-full rounded-lg">
                        <AccordionContent className="text-center">{facultyCount} Faculty</AccordionContent>
                        <AccordionContent className="text-center">{departmentCount} Department</AccordionContent>
                        <AccordionContent className="text-center">{articleCount} Article</AccordionContent>
                        <AccordionContent className="text-right"><Link href={`/category/${url}`} className="hover:text-gray-300">Link</Link></AccordionContent>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    )
}