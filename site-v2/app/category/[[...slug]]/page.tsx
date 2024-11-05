// app/[[...slug]]/page.tsx
import  clientPromise  from '@/lib/mongodb';

interface CategoryInfo {
    /**
     * A TypeScript interface representing information about an academic category.
     *
     * Attributes:
     *     url (string): A URL-friendly version of the category name.
     *     faculty_count (number): The number of faculty members in this category.
     *     department_count (number): The number of departments in this category.
     *     article_count (number): The number of articles in this category.
     *     files (Set<string>): A set of file names associated with this category.
     *     faculty (Set<string>): A set of faculty names in this category.
     *     departments (Set<string>): A set of department names in this category.
     *     titles (Set<string>): A set of article titles in this category.
     *     tc_count (number): Total citation count for articles in this category.
     *     tc_list (number[]): A list of individual citation counts for articles.
     *     citation_average (number): The average number of citations per article.
     *     doi_list (Set<string>): A set of DOIs associated with this category.
     */
    url: string;
    faculty_count: number;
    department_count: number;
    article_count: number;
    tc_count: number;
    citation_average: number;
    doi_list: string[];
    name: String
}

interface PageProps {
    params: {
        slug?: string[];
    };
}

export default async function Page({ params }: PageProps) {
    const client = await clientPromise;

    const db = client.db('Site_Data'); // Replace with your actual DB name
    const collection = await db.collection('category_data')
    // Get the last element in the slug array or default to an empty string
    const slug = params.slug ? params.slug[params.slug.length - 1] : '';
    const documents = await collection.find({'url': slug}).toArray();


    if (documents.length === 0) return <p>Data not found</p>;
    // Transform documents to CategoryInfo type
    const category: CategoryInfo = {
        url: documents[0].url,
        faculty_count: documents[0].faculty_count,
        department_count: documents[0].department_count,
        article_count: documents[0].article_count,
        tc_count: documents[0].tc_count,
        citation_average: documents[0].citation_average,
        doi_list: documents[0].doi_list,
        name: documents[0].name,
    };
    return (
    <div>
        <h1>{category.name}</h1>
        <p>Faculty Count: {category.faculty_count}</p>
        <p>Department Count: {category.department_count}</p>
        <p>Article Count: {category.article_count}</p>
        <p>Total Citations: {category.tc_count}</p>
        <p>Average Citations: {category.citation_average}</p>
        <div>
            <h2>DOI List</h2>
            <ul>
                {category.doi_list.map((doi, index) => (
                    <li key={index}>{doi}</li>
                ))}
            </ul>
        </div>
    </div>
    );
}
