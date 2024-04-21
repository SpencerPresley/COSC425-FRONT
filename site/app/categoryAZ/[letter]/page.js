import { CardAZ } from "@/components/cardAZ"

export async function generateStaticParams() {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());

  return Object.keys(data).map((letter) => ({
    letter: data[letter].url,
  }));
}

async function getletterData(letter) {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());

  // Find the letter object based on the 'url' property
  const filtEntries = Object.entries(data).filter(([_, item]) => item.url.startsWith(letter));

  if (filtEntries) {
    const letterData = filtEntries.map(([categoryName, entry]) => ({ categoryName, ...entry }));
    return letterData;
  }

  return null;
}

export default async function Page({ params }) {
  const { letter } = params;
  const letterData = await getletterData(letter);

  if (!letterData) {
    // Handle the case when letterData is undefined
    return <div>Letter not found</div>;
  }

  return (
    <div className="bg-suMaroon w-full h-full flex flex-col space-y-4">
      <span className="font-bold text-4xl text-center text-white flex flex-col justify-center">page action</span>
      <div className="overflow-y-auto">
        <div className="max-h-screen flex flex-col space-y-2 m-8">
          <div className="flex lg:flex-row flex-col shrink-0 w-full h-60 rounded-lg">
            {letterData.map((entry, index) => (
              <div key={index}>
                <CardAZ
                  title={entry.categoryName}
                  facultyCount={entry.faculty_count}
                  departmentCount={entry.department_count}
                  articleCount={entry.article_count}
                  url={entry.url}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}