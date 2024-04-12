import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const CatAccord = () => {
    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="faculty">
                    <AccordionTrigger>1 Faculty</AccordionTrigger>
                    <AccordionContent>
                        Jing
                    </AccordionContent>
                    <AccordionContent>
                        Jing
                    </AccordionContent>
                    <AccordionContent>
                        Jing
                    </AccordionContent>
                    <AccordionContent>
                        Jing
                    </AccordionContent>
                    <AccordionContent>
                        Jing
                    </AccordionContent>
                    <AccordionContent>
                        Jing
                    </AccordionContent>
                    <AccordionContent>
                        Jing
                    </AccordionContent>
                    <AccordionContent>
                        Jing
                    </AccordionContent>
                    <AccordionContent>
                        Jing
                    </AccordionContent>
                    <AccordionContent>
                        Jing
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dept">
                    <AccordionTrigger>1 Department</AccordionTrigger>
                    <AccordionContent>
                        Computer science
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="article">
                    <AccordionTrigger>1 Article</AccordionTrigger>
                    <AccordionContent>
                        Mouse Cheese
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    );
};