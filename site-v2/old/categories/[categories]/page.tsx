import React from "react";
import { Card } from "@/components/componentsCategoryPage/card";

interface CategoryData {
    url: string;
    faculty_count: number;
    department_count: number;
    article_count: number;
    faculty: string[];
    departments: string[];
    titles: string[];
}
// "Information Science & Library Science": {
//     "url": "information-science-library-science",
//     "faculty_count": 2,
//     "department_count": 2,
//     "article_count": 4,
//     "faculty": [
//         "Martin, Jennifer M.",
//         "Quan, Jing"
//     ],
//     "departments": [
//         "Informat Decis Sci",
//         "Informat & Decis Sci"
//     ],
//     "titles": [
//         "Risk and Revenue Management in the Chinese Auto Loan Industry",
//         "Records, Responsibility, and Power: An Overview of Cataloging Ethics",
//         "Software Vulnerability and Application Security Risk",
//         "IT Application Maturity, Management Institutional Capability and Process Management Capability"
//     ]
// }

interface PageParams {
    url: string;
    data: {
        categoryName: string;
        url: string;
        faculty_count: number;
        department_count: number;
        article_count: number;
        faculty: string[];
        departments: string[];
        titles: string[];
      };
}


export async function generateStaticParams() {
    const data: Record<string, CategoryData> = await fetch(
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    ).then((res) => res.json());

    // console.log(data);
    
    return Object.entries(data).map(([categoryName, categoryData]) => ({
        url: categoryData.url,
        data: {
            categoryName,
            url: categoryData.url,
            faculty_count: categoryData.faculty_count,
            department_count: categoryData.department_count,
            article_count: categoryData.article_count,
            faculty: categoryData.faculty,
            departments: categoryData.departments,
            titles: categoryData.titles,
        },
    }));
}



export default async function Page({ params }: { params: any }) {
    console.log(params);

  const {
    data: {
      categoryName,
      faculty_count,
      department_count,
      article_count,
      faculty,
      departments,
      titles,
    },
  } = params;


    const themes = [
        "Reslience Training",
        "Job Satisffaction",
        "Turnover Intentinos",
        "Role Stressors",
        "Stress Arousal",
        "Burnout",
    ];
    
    
    return (
        <div className="bg-black border rounded-xl border-cyan-500 shadow-xl shadow-cyan-700 w-full h-full flex flex-col space-y-4 pt-10 pb-10 px-10">
          <span className="font-bold text-4xl text-center text-white flex flex-col justify-center">
            {params.data.categoryName}
          </span>
          <div className="overflow-scroll max-h-screen flex flex-col space-y-2 w-full">
            <div className="flex lg:flex-row flex-col shrink-0 border-zinc-500 w-full lg:h-64 h-full rounded-lg text-white">
              <Card title="Faculty" count={params.data.faculty_count} items={params.data.faculty} />
            </div>
            <div className="shrink-0 border-zinc-500 w-full h-64 rounded-lg text-white">
              <Card title="Departments" count={params.data.department_count} items={params.data.departments} />
            </div>
            <div className="overflow-scroll shrink-0 w-full h-64 rounded-lg text-white">
              <Card title="Articles" count={params.data.article_count} items={params.data.titles} />
            </div>
            <div className="shrink-0 w-full h-64 rounded-lg">
              <div className="overflow-scroll max-h-full text-center text-white">
                <h4>Theme</h4>
                <ul>
                  {themes.map((theme, index) => (
                    <li key={index}>{theme}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
} 





