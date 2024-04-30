import Link from "next/link";

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

interface CategoryProps {
  category: string;
}

/* No singleton pattern necessary.
     Next.js fetch() automatically memoizes data 
     */
async function fetchS3Data() {
  const data = (await fetch(
    "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"
  ).then((res) => res.json())) as CategoryObject;

  return data;
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

export const UrlsLetters = () => {
  const url = "/categories";

  /* creates an array of all the aphabetical characters.
    split('') is a method that splits a string into an array of characters. */
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div>
      <Link href={`${url}`}>
        {" "}
        <strong>All</strong>{" "}
      </Link>
      {letters.map((letter) => (
        <>
          <Link key={letter} href={`${url}/${letter}`}>
            {letter}
          </Link>{" "}
        </>
      ))}
    </div>
  );
};
