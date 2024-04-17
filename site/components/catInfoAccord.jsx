import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  export const CatAccord = ({ 
    facultyCount,
    departmentCount,
    articleCount,
    faculty,
    departments,
    titles
    }) => {
    return (
      <div className="">
        <Accordion type="single" collapsible>
          <AccordionItem value="faculty">
            <AccordionTrigger>({facultyCount}) Faculty</AccordionTrigger>
            <div className="overflow-scroll max-h-full">
              {faculty.map((member, index) => (
                <AccordionContent key={index}>{member}</AccordionContent>
              ))}
            </div>
          </AccordionItem>
          <AccordionItem value="dept">
            <AccordionTrigger>({departmentCount}) Departments</AccordionTrigger>
            {departments.map((dept, index) => (
              <AccordionContent key={index}>{dept}</AccordionContent>
            ))}
          </AccordionItem>
          <AccordionItem value="article">
            <AccordionTrigger>({articleCount}) Article(s)</AccordionTrigger>
            {titles.map((tit, index) => (
              <AccordionContent key={index}>{tit}</AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
      </div>
    );
  };
