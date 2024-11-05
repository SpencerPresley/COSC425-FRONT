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

interface PageProps {
    params: {
        slug?: string[];
    };
}

export default async function Page({ params }: PageProps) {
    const client = await clientPromise;

    const db = client.db('Site_Data'); // Replace with your actual DB name
    const collection = await db.collection('article_data')
    // Get the last element in the slug array or default to an empty string
    const slug = params.slug ? params.slug[params.slug.length - 1] : '';
    const documents = await collection.find({'url': slug}).toArray();


    if (documents.length === 0) return <p>Data not found</p>;
    // Transform documents to CategoryInfo type
    const article: CrossrefArticleDetails = {
        _id: documents[0].__id,
        title: documents[0].title,
        tc_count: documents[0].tc_count,
        faculty_members: documents[0].faculty_members,
        faculty_affiliations: documents[0].faculty_affiliations,
        abstract: documents[0].abstract,
        license_url: documents[0].license_url,
        date_published_print: documents[0].date_published_print,
        date_published_online: documents[0].date_published_online,
        journal: documents[0].journal,
        download_url: documents[0].download_url,
        doi: documents[0].doi,
        url: documents[0].url,
    };
    return (
    <div className="container mx-auto p-4 h-full">
        <div className="overflow-y-auto h-screen">
            <h2 className="text-2xl font-semibold text-white">{article.title}</h2>
            <h3 className="text-xl font-semibold text-white">Abstract:</h3>
            <p className="text-white mt-2">{article.abstract}</p>
            <p className="text-white mt-2"><strong>Citation Count:</strong> {article.tc_count}</p>
            <p className="text-white"><strong>Journal:</strong> {article.journal}</p>
            <p className="text-white"><strong>Published Online:</strong> {article.date_published_online}</p>
            <p className="text-white"><strong>Published Print:</strong> {article.date_published_print}</p>
            <div className="mt-4">
                <a href={article.download_url} className="text-blue-500 hover:underline mr-4">Download</a>
                <a href={article.license_url} className="text-blue-500 hover:underline">License</a>
            </div>
            <p className="text-white mt-2"><strong>DOI:</strong> {article.doi}</p>
            <h3 className="text-xl font-semibold text-white mt-4">Faculty Members:</h3>
            <ul className="list-none">
                {article.faculty_members.map((member, index) => (
                    <li key={index} className="text-white space-x-4">
                        <p>{member}</p><p>{article.faculty_affiliations[member]}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    );
}
