import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const InfluencialFaculty = () => {
    return (
        <div>
            <div value="faculty" className="text-white px-10 pb-10">
                <h2>Influencial Faculty:</h2>
                <div className="px-10">
                    <div className="text-sm list-disk;">
                        <br />
                        <li>
                            Dr. Sally Smith, Computer science faculty<br />
                            <p className="pl-5">Member: 12 Publications, 2 Funding Awards</p>
                        </li>
                    </div>
                    <div className="text-sm list-disk">
                        <br />
                        <li>
                            Dr. Jeff Richards, Computer science faculty<br />
                            <p className="pl-5">Member: 7 Publications, 1 Funding Award</p>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    );
};