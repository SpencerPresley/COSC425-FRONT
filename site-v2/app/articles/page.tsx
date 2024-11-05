// src/app/items/page.tsx
import  clientPromise  from '@/lib/mongodb';

interface CrossrefArticleDetails {
    /**
     * An interface representing details about an individual article.
     *
     * Attributes:
     *     tc_count (number): Total citation count for the article.
     *     faculty_members (string[]): List of faculty members associated with the article.
     *     faculty_affiliations (Record<string, string[]>): Mapping of faculty members to their affiliations.
     */
    _id: string;
    title: string;
    tc_count: number;
    faculty_members: string[];
    faculty_affiliations: Record<string, string[]>;
    abstract: string;
    license_url: string;
    date_published_print: string;
    date_published_online: string;
    journal: string;
    download_url: string;
    doi: string;
    url: string;
}

export default async function ArticlesPage() {
    const client = await clientPromise;

    const db = client.db('Site_Data'); // Replace with your actual DB name
    const collection = await db.collection('article_data')
    // Get the last element in the slug array or default to an empty string
    const documents = await collection.find({}).toArray();

    if (documents.length === 0) return <p>Data not found</p>;
    
    const articles: CrossrefArticleDetails[] = documents.map(doc => ({
        _id: doc._id.toString(), // Convert ObjectId to string
        title: doc.title,
        tc_count: doc.tc_count,
        faculty_members: doc.faculty_members,
        faculty_affiliations: doc.faculty_affiliations,
        abstract: doc.abstract,
        license_url: doc.license_url,
        date_published_print: doc.date_published_print,
        date_published_online: doc.date_published_online,
        journal: doc.journal,
        download_url: doc.download_url,
        doi: doc.doi,
        url: doc.url,
    }));
    
    return (
        <div className="container mx-auto p-4 h-full">
            <h1 className="text-3xl font-bold mb-4">Articles</h1>
            <div className="overflow-y-auto h-screen">
                <ul className="space-y-4 h-screen">
                    {articles.map((article) => (
                        <li key={article._id} className="shadow-md rounded-lg p-4">
                            <h2 className="text-2xl font-semibold text-black dark:text-white">{article.title}</h2>
                            <h3 className="text-xl font-semibold text-black dark:text-white">Abstract:</h3>
                            <p className="text-gray-600 dark:text-white mt-2">{article.abstract}</p>
                            <p className="text-gray-600 dark:text-white mt-2"><strong>Citation Count:</strong> {article.tc_count}</p>
                            <p className="text-gray-600 dark:text-white"><strong>Journal:</strong> {article.journal}</p>
                            <p className="text-gray-600 dark:text-white"><strong>Published Online:</strong> {article.date_published_online}</p>
                            <p className="text-gray-600 dark:text-white"><strong>Published Print:</strong> {article.date_published_print}</p>
                            <div className="mt-4">
                                <a href={article.download_url} className="text-blue-500 hover:underline mr-4">Download</a>
                                <a href={article.license_url} className="text-blue-500 hover:underline">License</a>
                            </div>
                            <p className="text-white mt-2"><strong>DOI:</strong> {article.doi}</p>
                            <h3 className="text-xl font-semibold text-white mt-4">Faculty Members:</h3>
                            <ul className="list-none">
                                {article.faculty_members.map((member, index) => (
                                    <li key={index} className="text-gray-600 dark:text-white space-x-4">
                                        <p>{member}</p><p>{article.faculty_affiliations[member]}</p>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 dark:text-white">{article.url}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    );
  }
  