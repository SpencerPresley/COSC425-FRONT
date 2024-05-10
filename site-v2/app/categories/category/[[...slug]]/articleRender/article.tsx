interface CategoryArticleData {
  [categoryName: string]: ArticleData;  // Maps category names to their data
}

interface ArticleProps {
  categoryName: string;
}

interface ArticleData {
  article_citation_map: CitationMap;
}

interface ArticleInfo {
  title: string;
  citations: number;
}

interface CitationMap {
  [articleTitle: string]: number;  // Maps article titles to their citation counts
}

async function fetchArticleData() {
  const data = (await fetch(
    "https://cosc425-category-data.s3.us-east-2.amazonaws.com/processed_article_stats_data.json"
  ).then((res) => res.json())) as CategoryArticleData;

  // console.log(data);
  return data;
}


async function getArticleData(categoryName: string) {
  const data = await fetchArticleData();
  console.log("Fetched data:", data);  // Log the fetched data to see what it contains

  const articleData = data[categoryName];

  if (!articleData) {
    console.error(`No data found for category: ${categoryName}`);
    return {
      sortedArticles: [{ title: "No articles currently available, check back later.", citations: 0 }]
    };
  }

  const sortedArticles = Object.entries((articleData as ArticleData).article_citation_map)
    .sort((a, b) => b[1] - a[1])
    .map(([title, citations]): ArticleInfo => ({ title, citations }));

  return {
    sortedArticles
  };
}


export async function Articles({ categoryName }: ArticleProps) {
  // console.log("Articles Category: ", category)
  // console.log("Return: ", data);
  let data = await getArticleData(categoryName);

  if (!data) {
    data = {
      sortedArticles: [{ title: "No articles currently available, check back later.", citations: 0 }]
    }
  }
  
  const { sortedArticles: articleInfo } = data;
  const { sortedArticles } = data;

  return (
    <div className="bg-gray-800 dark:bg-gray-700 flex flex-col items-center justify-center gap-6 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center">{categoryName}</h1>
      <h2 className="text-2xl font-semibold mt-4">Articles</h2>
      <ul className="list-disc pl-1">
                  {data.sortedArticles.map(({ title, citations }) => (
                    <li className="ml-2 md:ml-4 py-2" key={title}>
                      <h3 className="text-white font-normal md:font-medium text-sm md:text-lg">
                        {title}{" "}
                        <span className="text-xs bg-clip-text text-transparent bg-white md:text-sm text-left opacity-90 italic font-normal">
                          ({citations} citations)
                        </span>
                      </h3>
                    </li>
                  ))}
                </ul>
    </div>
  );
}
