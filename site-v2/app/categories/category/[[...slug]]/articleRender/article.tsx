interface CategoryObject {
    [key: string]: {
      url: string;
      faculty_count: number;
      department_count: number;
      article_count: number;
      faculty: string[];
      departments: string[];
      titles: string[];
    };
  }
  
  interface CategoryData {
    url: string;
    faculty_count: number;
    department_count: number;
    article_count: number;
    faculty: string[];
    departments: string[];
    titles: string[];
  }
  
  interface ArticleProps {
      category: string;
  }
  
  async function fetchS3Data() {
    const data = (await fetch(
      "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
    ).then((res) => res.json())) as CategoryObject;
    return data;
  }
  
  async function getArticleData(category: string) {
    const data = await fetchS3Data();
  
    // Find the category object based on the 'url' property
    const categoryEntry = Object.entries(data).find(
        ([, categoryData]) => categoryData.url === category
    );
  
    if (!categoryEntry) {
        console.log("Category not found");
        return null;
    }
  
    const [categoryName, categoryData] = categoryEntry;
  
    return { categoryName, ...categoryData };
  }
  
  export async function Articles ({ category }: ArticleProps) {
    // console.log("Articles Category: ", category)
    const data = await getArticleData(category);
    // console.log("Return: ", data);
  
    if (!data) {
      return <div>Articles not found</div>;
    }
    
    const { categoryName, faculty, departments, titles } = data;

    return (
<div className="bg-white dark:bg-gray-500 flex flex-col items-center justify-center gap-4 text-black dark:text-white">

        <h1 className="text-3x1 font-bold">{categoryName}</h1>
        <h2 className="text-2xl font-bold"> Article List</h2>
        <ul className="overflow-hidden max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex flex-col space-y-4">
          {titles.sort().map((title: string) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </div>
    );
  }
  