
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

interface CrossrefArticleProps {
    article: CrossrefArticleDetails;
}

export function Article({ article }: CrossrefArticleProps){

    return (
        <div className="container mx-auto p-4 h-full rounded-lg">
            <div className="overflow-y-auto h-screen">
                <h2 className="text-2xl font-semibold text-black dark:text-white">{article.title}</h2>
                <h3 className="text-xl font-semibold text-black dark:text-white">Abstract:</h3>
                <p className="text-black dark:text-white mt-2">{article.abstract}</p>
                <p className="text-black dark:text-white mt-2"><strong>Citation Count:</strong> {article.tc_count}</p>
                <p className="text-black dark:text-white"><strong>Journal:</strong> {article.journal}</p>
                <p className="text-black dark:text-white"><strong>Published Online:</strong> {article.date_published_online}</p>
                <p className="text-black dark:text-white"><strong>Published Print:</strong> {article.date_published_print}</p>
                <div className="mt-4">
                    <a href={article.download_url} className="text-blue-500 hover:underline mr-4">Download</a>
                    <a href={article.license_url} className="text-blue-500 hover:underline">License</a>
                </div>
                <p className="text-black dark:text-white mt-2"><strong>DOI:</strong> {article.doi}</p>
                <h3 className="text-xl font-semibold text-black dark:text-white mt-4">Faculty Members:</h3>
                <ul className="list-none">
                    {article.faculty_members.map((member, index) => (
                        <li key={index} className="text-black dark:text-white space-x-4">
                            <p>{member}</p><p>{article.faculty_affiliations[member]}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}