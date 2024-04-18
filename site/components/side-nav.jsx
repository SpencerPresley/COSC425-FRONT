// "use client";

// import React, { useEffect, useState } from "react";
import Link from "next/link";
// export async function getUrls () {
//     const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json")
//         .then((res) => res.json());

//     const categoryUrls = Object.entries(data).find(([_, item]) => item.url);
//     return (
//         categoryUrls
//     );
// };

async function getUrls() {
    const res = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json");
    const data = await res.json();
  
    // Extract the 'url' property from each category
    const urls = Object.values(data).map((category) => category.url);
  
    return urls;
  }

  export const SideNav = async () => {
    const categoryUrls = await getUrls();
  
    return (
      <div className="md:w-full bg-suMaroon h-full flex-1 border-r border-zinc-200 hidden md:flex">
        {/* ... */}
        <div className="flex flex-col space-y-2 md:px-6 overflow-scroll max-h-screen">
          {categoryUrls.map((url) => (
            <div
              key={url}
              className="shrink-0 border-dashed border w-full h-24 text-center my-auto"
            >
              <Link href={`/category/${url}`}>
                <a>
                  <h2 className="text-white text-xl text-bold">
                    {url
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </h2>
                </a>
              </Link>
            </div>
          ))}
        </div>
        {/* ... */}
      </div>
    );
  };