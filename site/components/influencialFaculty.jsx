import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const InfluencialFaculty = () => {
    return (
        <div>
                <h2>Influencial Faculty:</h2>
                <Accordion type="single" collapsible>
                    <AccordionItem value="faculty">
                        <AccordionTrigger>Faculty</AccordionTrigger>
                            <AccordionContent>
                                {p}
                            </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="dept">
                        <AccordionTrigger>Departments</AccordionTrigger>
                            <AccordionContent> 
                                {p}
                            </AccordionContent>

                    </AccordionItem>
                    <AccordionItem value="article">
                        <AccordionTrigger>Article</AccordionTrigger>
                        <AccordionContent>
                        {p}
                    </AccordionContent>
                    

                    </AccordionItem>
                </Accordion>            
        </div>
    );
};