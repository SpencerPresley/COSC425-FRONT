interface CategoryArticleData {
  [categoryName: string]: ArticleData; // Maps category names to their data
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
  [articleTitle: string]: number; // Maps article titles to their citation counts
}

async function fetchArticleData() {
  const data = (await fetch(
    'https://cosc425-category-data.s3.us-east-2.amazonaws.com/processed_article_stats_data.json'
  ).then((res) => res.json())) as CategoryArticleData;

  // console.log(data);
  return data;
}

async function getArticleData(categoryName: string) {
  const data = await fetchArticleData();
  console.log('Fetched data:', data); // Log the fetched data to see what it contains

  const articleData = data[categoryName];

  if (!articleData) {
    console.error(`No data found for category: ${categoryName}`);
    return {
      sortedArticles: [
        {
          title: 'No articles currently available, check back later.',
          citations: 0,
        },
      ],
    };
  }

  const sortedArticles = Object.entries(
    (articleData as ArticleData).article_citation_map
  )
    .sort((a, b) => b[1] - a[1])
    .map(([title, citations]): ArticleInfo => ({ title, citations }));

  return {
    sortedArticles,
  };
}

export async function Articles({ categoryName }: ArticleProps) {
  // console.log("Articles Category: ", category)
  // console.log("Return: ", data);
  let data = await getArticleData(categoryName);

  if (!data) {
    data = {
      sortedArticles: [
        {
          title: 'No articles currently available, check back later.',
          citations: 0,
        },
      ],
    };
  }

  const { sortedArticles: articleInfo } = data;
  const { sortedArticles } = data;

  return (
    <div className="bg-gray-300 dark:bg-gray-800 gap-6 text-white p-6 rounded-lg shadow-lg min-h-[85vh]">
      <h1 className="text-4xl font-bold text-center text-suMaroon dark:text-suGold pb-4">{categoryName}</h1>
      <h2 className="text-2xl font-semibold mt-5 text-suMaroon dark:text-suGold text-center pb-4">Articles</h2>
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-2">
        {data.sortedArticles.map(({ title, citations }) => (
          <li key={title} className="mb-2 bg-gray-50 hover:bg-gray-100 hover:shadow-lg p-4 dark:bg-suMaroon/90 dark:text-suGold rounded-lg shadow transform transition duration-300 ease-in-out origin-center">
            <h3 className="font-bold text-suMaroon dark:text-suGold">
              {title}
              <span className="block text-xs text-gray-900 dark:text-white/90 italic font-normal">
                ({citations} citations)
              </span>
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
