import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const CatAccord = ({ data }) => {
    return (
        <div>
            {Object.entries(data).map(([category, details]) => (
                <div key={category}>
                    <h2>Personnel & Activity</h2>
                    <Accordion type="single" collapsible className=" px-10 pb-10 ">
                        <AccordionItem value="faculty">
                            <AccordionTrigger className="font-bold">{details.faculty_count} Faculty</AccordionTrigger>
                            {Object.entries(details.faculty).map(([d, p]) => (
                                <AccordionContent className=" px-10 pb-10 ">
                                    <li>
                                        {p}
                                    </li>
                                </AccordionContent>
                            ))}
                        </AccordionItem>
                        <AccordionItem value="dept">
                            <AccordionTrigger className="font-bold">{details.department_count} Departments</AccordionTrigger>
                            {Object.entries(details.departments).map(([d, p]) => (
                                <AccordionContent className=" px-10 pb-10 ">
                                    <li>
                                        {p}
                                    </li>
                                </AccordionContent>
                            ))}

                        </AccordionItem>
                        <AccordionItem value="article">
                            <AccordionTrigger className="font-bold">{details.article_count} Article(s)</AccordionTrigger>
                            {Object.entries(details.titles).map(([d, p]) => (
                                <AccordionContent className=" px-10 pb-10 ">
                                    <li>
                                        {p}
                                    </li>
                                </AccordionContent>
                            ))}
                        </AccordionItem>
                        {/* <AccordionItem value="Proposals">
                            <AccordionTrigger className="font-bold">3 Proposals</AccordionTrigger>
                                <AccordionContent className=" px-10 pb-10 ">
                                    <li>
                                        Intorduction to Computer Mice 1
                                    </li>
                                    <li>
                                        Intorduction to Computer Mice 2
                                    </li>
                                    <li>
                                        Intorduction to Computer Mice 3
                                    </li>
                                </AccordionContent>
                        </AccordionItem> */}
                    </Accordion>
                </div>
            ))}
        </div>
    );
};