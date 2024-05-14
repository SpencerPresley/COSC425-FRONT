import Link from 'next/link';
import fetchCategoryData from '@/lib/categoryData/fetchCategoryData';

async function loadCategoryData() {
  try {
    const data = await fetchCategoryData();
    // console.log(data);
  } catch (error) {
    console.error('FAILED TO FETCH CATEGORY DATA', error);
  }
}

interface CategoryLinkerProps {
  title: string;
  url: string;
}

export const CategoryLinker = ({ title, url }: CategoryLinkerProps) => {
  return (
    <div>
      <Link href={`/categories/category/${url}`}>
        <strong>{title}</strong>
      </Link>
    </div>
  );
};
