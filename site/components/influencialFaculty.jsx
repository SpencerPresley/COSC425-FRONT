import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const InfluencialFaculty = () => {
    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="faculty">
                    <h2>Influencial Faculty:</h2>
                    <li>
                        <div>
                            Dr. Sally Smith, Computer science faculty<br />
                            Member: 12 Publications, 2 Funding Awards
                        </div>
                        
                    </li>
                    <li>
                        
                            Dr. Jeff Richards, Computer science faculty<br />
                            Member: 7 Publications, 1 Funding Award
                        
                    </li>
                </AccordionItem>
            </Accordion>
        </div>
    );
};