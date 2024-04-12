import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

// export const CatAccord = () => {
//     return (
//         <div>
//             <Accordion type="single" collapsible>
//                 <AccordionItem value="faculty">
//                     <AccordionTrigger>1 Faculty</AccordionTrigger>
//                     <AccordionContent>
//                         Jing
//                     </AccordionContent>
//                     <AccordionContent>
//                         Jing
//                     </AccordionContent>
//                     <AccordionContent>
//                         Jing
//                     </AccordionContent>
//                     <AccordionContent>
//                         Jing
//                     </AccordionContent>
//                     <AccordionContent>
//                         Jing
//                     </AccordionContent>
//                     <AccordionContent>
//                         Jing
//                     </AccordionContent>
//                     <AccordionContent>
//                         Jing
//                     </AccordionContent>
//                     <AccordionContent>
//                         Jing
//                     </AccordionContent>
//                     <AccordionContent>
//                         Jing
//                     </AccordionContent>
//                     <AccordionContent>
//                         Jing
//                     </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="dept">
//                     <AccordionTrigger>1 Department</AccordionTrigger>
//                     <AccordionContent>
//                         Computer science
//                     </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="article">
//                     <AccordionTrigger>1 Article</AccordionTrigger>
//                     <AccordionContent>
//                         Mouse Cheese
//                     </AccordionContent>
//                 </AccordionItem>
//             </Accordion>

//         </div>
//     );
// };

export const CatAccord = (props) => {
    console.log(props.Business)
    return (<div>
                <h1>{props.faculty_count}</h1>
            </div>
    );
};