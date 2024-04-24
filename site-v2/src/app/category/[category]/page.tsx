
import React from "react";
import "@/styles/globals.css"
import { Card } from "@/components/CategoryComponents/card"

export async function generateStaticParams() {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());

  return Object.keys(data).map((category) => ({
    category: data[category].url,
  }));
}

async function getCategoryData(category) {
    const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());
  
    // Find the category object based on the 'url' property
    const categoryEntry = Object.entries(data).find(([_, item]) => item.url === category);
  
    if (categoryEntry) {
      const [categoryName, categoryData] = categoryEntry;
      return { categoryName, ...categoryData };
    }
  
    return null;
  }

  export default async function Page({ params }) {
    const { category } = params;
    const categoryData = await getCategoryData(category);
  
    if (!categoryData) {
      // Handle the case when categoryData is undefined
      return <div>Category not found</div>;
    }
  
    const themes = ["Resilience Training","Job Satisfaction","Turnover Intentions","Role Stressors","Stress Arousal","Burnout"];
  
    const {
      categoryName,
      faculty_count,
      department_count,
      article_count,
      faculty,
      departments,
      titles
    } = categoryData
  
    return (
          <div className="bg-primary border rounded-xl shadow-xl shadow-cyan-700 w-full h-full flex flex-col space-y-4 pt-10 pb-10 px-10">
              <span className="font-bold text-4xl text-center text-white flex flex-col justify-center">{categoryName}</span>
              <div className="overflow-scroll max-h-screen flex flex-col space-y-2 w-full">
                <div className="flex lg:flex-row flex-col shrink-0 border-zinc-500 w-full lg:h-64 h-full rounded-lg  text-white">
                
                    <Card 
                      title={"faculty"}
                      count={categoryData.faculty_count}
                      items={categoryData.faculty}
      
                    />
                </div>
                <div className="shrink-0 border-zinc-500 w-full h-64 rounded-lg text-white">
                  <Card 
                        title={"Departments"}
                        count={categoryData.department_count}
                        items={categoryData.departments}
                      />
                </div>
                <div className="overflow-scroll shrink-0 w-full h-64 rounded-lg text-white">
                  <Card 
                        title={"Articles"}
                        count={categoryData.article_count}
                        items={categoryData.titles}
                      />
                </div>
                <div className="shrink-0 w-full h-64 rounded-lg">
                    <div className="overflow-scroll max-h-full text-center text-white">
                      <h4>Theme</h4>
                        <ul>
                            {themes.map((theme, index)=>(
                                <li key={index}>{theme}</li>
                            ))}
                        </ul>
                    </div>
                </div>
              </div>
          </div>
    )
  }
