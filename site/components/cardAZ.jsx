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
    }) => {
    return (
        <div className="bg-white rounded-lg h-56 w-1/4 hover:bg-gray-100 text-center flex flex-col overflow-scroll min-h-full p-1">
            <Accordion type="single" collapsible>
                <AccordionItem value="title"className="border-none rounded-lg">
                    <AccordionTrigger>({count}) {title}</AccordionTrigger>
                    <div className="overflow-scroll max-h-full">
                    {items.map((member, index) => (
                        <AccordionContent key={index}>{member}</AccordionContent>
                    ))}
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    )
}