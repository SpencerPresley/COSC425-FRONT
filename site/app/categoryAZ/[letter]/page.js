import { CardAZ } from "@/components/cardAZ"
import { CatAZPag } from "@/components/catAzPag"

async function getLetterData(letter) {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());

  // Find the category object based on the first letter in url property
  const filtEntries = Object.entries(data).filter(([_, item]) => item.url.startsWith(letter));

  if (filtEntries) {
    const letterData = filtEntries.map(([categoryName, entry]) => ({ categoryName, ...entry }));
    return letterData;
  }

  return null;
}

async function getAllData(letter) {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());
  const letterData = Object.entries(data).map(([categoryName, ...entry]) => ({categoryName, ...entry}));
  return letterData;
}

export default async function Page({ params }) {
  const { letter } = params;
  let letterData = null;

  if (letter == "all")
    letterData = await getAllData(letter);
  else
    letterData = await getLetterData(letter);

  if (!letterData) {
    // Handle the case when letterData is undefined
    return <div>Letter not found</div>;
  }

  const entrySets = [];
  for (let i = 0; i < letterData.length; i += 4) {
    entrySets.push(letterData.slice(i, i + 4));
  }

  return (
    <div className="bg-suMaroon w-full flex flex-col space-y-4 rounded-lg shadow-inner">
      <div className="m-8 text-5xl font-bold text-white text-center">Topic A-Z</div>
      <CatAZPag />
      <div>
        {entrySets.map((set, setIndex) => (
          <div key={setIndex} className="flex flex-col space-y-2 m-8">
            <div className="flex lg:flex-row flex-col shrink- w-full h-60 rounded-lg">
              {set.map((entry, index) => (
                <CardAZ
                  title={entry.categoryName}
                  facultyCount={entry.faculty_count}
                  departmentCount={entry.department_count}
                  articleCount={entry.article_count}
                  url={entry.url}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}