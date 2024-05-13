/*
    File to fetch the category data from the S3 bucket

    Singleton pattern ensures only one fetch happens. 
    
    If the data is already fetched, it will return the promise.
*/

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

let dataPromise: Promise<CategoryObject> | null = null;

function fetchCategoryData() {
  if (!dataPromise) {
    dataPromise = fetch(
      'http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json'
    ).then((res) => res.json());
  }
  return dataPromise;
}

export default fetchCategoryData;
