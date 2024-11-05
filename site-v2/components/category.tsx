
interface CategoryInfo {
    url: string;
    faculty_count: number;
    department_count: number;
    article_count: number;
    tc_count: number;
    citation_average: number;
    doi_list: string[];
    name: string;
}

interface CategoryProps {
    category: CategoryInfo;
}

export function Category({ category }: CategoryProps) {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
            <p className="text-lg text-gray-600 mb-2">URL: {category.url}</p>
            <p className="text-base text-gray-700 mb-2">Faculty Count: {category.faculty_count}</p>
            <p className="text-base text-gray-700 mb-2">Department Count: {category.department_count}</p>
            <p className="text-base text-gray-700 mb-2">Article Count: {category.article_count}</p>
            <p className="text-base text-gray-700 mb-2">Total Citations: {category.tc_count}</p>
            <p className="text-base text-gray-700 mb-2">Citation Average: {category.citation_average}</p>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">DOI List</h2>
                <ul className="list-disc list-inside">
                    {category.doi_list.map((doi, index) => (
                        <li key={index} className="text-base text-gray-700">
                            {doi}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}