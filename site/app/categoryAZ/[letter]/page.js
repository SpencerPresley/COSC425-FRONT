import { CardAZ } from "@/components/cardAZ"

export async function generateStaticParams() {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());

  return Object.keys(data).map((letter) => ({
    letter: data[letter].url,
  }));
}

async function getletterData(letter) {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());

  // Find the category object based on the first letter in url property
  const filtEntries = Object.entries(data).filter(([_, item]) => item.url.startsWith(letter));

  if (filtEntries) {
    const letterData = filtEntries.map(([categoryName, entry]) => ({ categoryName, ...entry }));
    return letterData;
  }

  return null;
}

async function getAll (letter) {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());

  if (filtEntries) {
    const letterData = filtEntries.map(([categoryName, entry]) => ({ categoryName, ...entry }));
    return letterData;
  }

  return null;
}

export default async function Page({ params }) {
  const { letter } = params;
  letterData;

  if(params=="all"||params==null)
    letterData = await getletterData(letter);

  if (!letterData) {
    // Handle the case when letterData is undefined
    return <div>Letter not found</div>;
  }

  const entrySets = [];
  for(let i = 0; i < letterData.length; i += 4){
    entrySets.push(letterData.slice(i, i+4));
  }

  return (
    <div className="bg-suMaroon w-full h-full flex flex-col space-y-4">
      <span className="font-bold text-4xl text-center text-white flex flex-col justify-center">page action</span>
      <div className="overflow-y-auto">
        {entrySets.map((set, setIndex) => (
        <div key={setIndex} className="max-h-screen flex flex-col space-y-2 m-8">
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