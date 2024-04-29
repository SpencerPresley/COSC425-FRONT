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
  
  async function getArticleData (category: string) {
      const data = await fetchS3Data();
  
      console.log("Category: ", category);
      // Find the category object based on the 'url' property
      const categoryEntry = Object.entries(data).find(
          ([categoryName, categoryData]) => categoryData.url === category
      );
  
      if (!categoryEntry) {
          console.log("Category not found");
          return null;
      }
  
      console.log(categoryEntry[0]);
      console.log(categoryEntry[1]);
  
      return { categoryEntry: categoryEntry[1] };
  }
  
  export async function Articles ({ category }: ArticleProps) {
    console.log("Articles Category: ", category)
    const data = await getArticleData(category);
    console.log("Return: ", data);
  
    if (!data) {
      return <div>Articles not found</div>;
    }
    
    const { categoryEntry: titles } = data;
  
    return (
      <div>
        <h1>{category}</h1>
        <h2>Articles</h2>
        <ul>
          {titles.titles.map((title: string) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </div>
    );
  }
  