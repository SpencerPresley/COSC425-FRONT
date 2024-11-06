// src/app/items/page.tsx
import  clientPromise  from '@/lib/mongodb';
import { Article } from '@/components/article'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

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

        <div className="flex h-screen space-x-2 bg-white dark:bg-black">
            <SidebarProvider>
                <AppSidebar className="flex flex-col w-64 bg-gray-800 text-white"/>
                <SidebarTrigger />
                <div className="flex flex-col overflow-y-auto p-4">
                    <h1 className="text-3xl font-bold mb-4">Articles</h1>
                    <div className="overflow-y-auto h-full">
                        <ul className="space-y-4 bg-white dark:bg-black">
                            {articles.map((article) => (
                                <li key={article._id} className="p-4 dark:bg-suMaroon/90 hover:bg-gray-100 bg-gray-50 shadow-black drop-shadow-md hover:drop-shadow-xl dark:hover:bg-suMaroon/70 transition-colors text-suMaroon dark:text-yellow-300 duration-150 ease-in-out">
                                    <Article article={article} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </SidebarProvider>
        </div>
        
    );
  }
  