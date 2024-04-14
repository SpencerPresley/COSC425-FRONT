import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const CatAccord = ({ data }) => {
    console.log(data);
    return (
        <div>
            {Object.entries(data).map(([category, details]) => (
            <div key={category}>
                <h2>{category}</h2>
                <Accordion type="single" collapsible>
                    <AccordionItem value="faculty">
                        <AccordionTrigger>{details.faculty_count} Faculty</AccordionTrigger>
                        {Object.entries(details.faculty).map(([d, p]) => (
                            <AccordionContent>
                                {p}
                            </AccordionContent>
                        ))}
                    </AccordionItem>
                    <AccordionItem value="dept">
                        <AccordionTrigger>{details.department_count} Departments</AccordionTrigger>
                        {Object.entries(details.departments).map(([d,p]) => (
                            <AccordionContent> 
                                {p}
                            </AccordionContent>
                        ))}

                    </AccordionItem>
                    <AccordionItem value="article">
                        <AccordionTrigger>{details.article_count} Article(s)</AccordionTrigger>
                        <AccordionContent>
                            Mouse Cheese
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            ))}
        </div>
    );
};

