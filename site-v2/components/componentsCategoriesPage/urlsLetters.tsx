import Link from "next/link";// this allows the dynamic routing between webpages. This is part of the next.js framework.

interface CategoryObject {// a template for the data that comes from the json file. The key is the name of categorty it self
  [key: string]: {//holds the category name. is the key for the data below
      url: string;// holds the url data. This is a string
      faculty_count: number;// holds the number of faculty. This is an int
      department_count: number;// holds the number of departments. This is an int
      article_count: number;// holds the number of articles. This is an int
      faculty: string[];// holds the facultty invlolved. This is a list
      departments: string[];//holds thge daprtments involved. This is a list
      titles: string[];// holds the titles of the articles for the category. This is a list
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

interface CategoryProps {
  category: string;
}

/* No singleton pattern necessary.
     Next.js fetch() automatically memoizes data 
     */
async function fetchS3Data() {// fetches the json data from the web. Can be called anytime
    const data = (await fetch(//fetchs the data from the provided parameter. It then assigns the data in a format to the dat variable.
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"//parameter to grab the json from
    ).then((res) => res.json())) as CategoryObject;//once it gets the data together it sets the format to the format oft eh categoryObject template. i also joins the data together like a list

    return data;//returns the json data
}

async function getUrls(letter: string) {
  const data = await fetchS3Data();

  return Object.values(data)
    .map((item) => item.url)
    .sort();
}

interface UrlsLettersProps {
  letter: string;
}

export const UrlsLetters = () => {// returns a line for the user to select which letters the beggining categorys should be
  const url = "/categories";//holds the url value

  /* creates an array of all the aphabetical characters.
    split('') is a method that splits a string into an array of characters. */
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (//retuns the line
    <div>
      <Link href={`${url}`}>{/**links the defualt page to the all so the user can see all entries. It is the only specifid one */}
        {" "}
        <strong>All</strong>{" "}{/**displays the all option */}
      </Link>
      {letters.map((letter) => (//maps all the letters for the user to select
        <>
          <Link key={letter} href={`${url}/${letter}`}>{/**displays the letters dynamically. It also links the letter to the current page of categories*/}
            {letter}{/**displays the letter */}
          </Link>{" "}
        </>
      ))}
    </div>
  );
};
