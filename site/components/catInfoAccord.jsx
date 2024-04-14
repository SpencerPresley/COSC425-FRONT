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
                            <AccordionTrigger className="font-bold">{details.faculty_count} Faculty</AccordionTrigger>
                            {Object.entries(details.faculty).map(([d, p]) => (
                                <AccordionContent>
                                    <li>
                                        {p}
                                    </li>
                                </AccordionContent>
                            ))}
                        </AccordionItem>
                        <AccordionItem value="dept">
                            <AccordionTrigger className="font-bold">{details.department_count} Departments</AccordionTrigger>
                            {Object.entries(details.departments).map(([d, p]) => (
                                <AccordionContent>
                                    <li>
                                        {p}
                                    </li>
                                </AccordionContent>
                            ))}

                        </AccordionItem>
                        <AccordionItem value="article">
                            <AccordionTrigger className="font-bold">{details.article_count} Article(s)</AccordionTrigger>
                            {Object.entries(details.titles).map(([d, p]) => (
                                <AccordionContent>
                                    <li>
                                        {p}
                                    </li>
                                </AccordionContent>
                            ))}

                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </div>
    );
};