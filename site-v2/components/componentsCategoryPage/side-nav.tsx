'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import fetchCategoryData from '@/lib/categoryData/fetchCategoryData';

export const SideNav = () => {
  const [categoryUrls, setCategoryUrls] = useState<string[]>([]);

  useEffect(() => {
    const getUrls = async () => {
      const data = await fetchCategoryData();
      const urls = Object.values(data).map((category: any) => category.url);
      setCategoryUrls(urls.sort());
    };

    getUrls();
  }, []);

  return (
    <div className="md:w-full bg-black h-full hidden md:flex">
      {/* ... */}
      <div className="flex flex-col space-y-2 md:px-6 overflow-scroll max-h-screen">
        <div className="shrink-0 w-full text-center my-auto">
          <h1 className="text-white text-xl text-bold">Category A-Z</h1>
        </div>
        {categoryUrls.map((url) => (
          <div key={url} className="shrink-0 w-full text-center my-auto">
            <Link href={`/category/${url}`}>
              <h2 className="text-white text-md">
                {url
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </h2>
            </Link>
          </div>
        ))}
      </div>
      {/* ... */}
    </div>
  );
};