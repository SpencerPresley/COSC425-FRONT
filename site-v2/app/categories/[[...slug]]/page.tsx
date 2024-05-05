import { Card } from "@nextui-org/card";// a card component from nextui. Used as a template to hold the crads title/link.
import { button as buttonStyles } from "@nextui-org/theme";// a button component from nextui. This can be used as a button.
import { Code } from "@nextui-org/code";// a code component from nextui. This can be used to display code.
import { title, subtitle } from "@/components/primitives";// a component from the components directory. holds data values we might use.
import { GithubIcon } from "@/components/icons";// a component from the components directory. This holds different icons for us to use if we want to.
import Link from "next/link";// this allows the dynamic routing between webpages. This is part of the next.js framework.
import { AzRender } from "./azRender/az";// grabs the AZRender componet from with the same directory file. This is used to dynamically display categories beggining with a certain letter
import { UrlsLetters } from "@/components/componentsCategoriesPage/urlsLetters";// grabs the component that displays urls in a line. This allows pagimnation between pages sorted from A-Z.

interface CategoryObject {// a template for the data that comes from the json file. The key is the name of categorty it self
    [key: string]: {//holds the category name. is the key for the data below
        url: string;// holds the url data. This is a string
        faculty_count: number;// holds the number of faculty. This is an int
        department_count: number;// holds the number of departments. This is an int
        article_count: number;// holds the number of articles. This is an int
        faculty: string[];// holds the facultty invlolved. This is a list
        departments: string[];//holds thge daprtments involved. This is a list
        titles: string[];// holds the titles of the articles for the category. This is a list
    };
}

interface CategoryData {
    url: string;
    faculty_count: number;
    department_count: number;
    article_count: number;
    faculty: string[];
    departments: string[];
    titles: string[];
}

interface CategoryProps {
    category: string;
}

function groupUrlsByFirstLetter(urls: { key: string; url: string }[]) {
    return urls.reduce(
        (acc: { [key: string]: { key: string; url: string }[] }, url) => {
            const firstLetter = url.key[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(url);
            return acc;
        },
        {}
    );
}

/* No singleton pattern necessary.
   Next.js fetch() automatically memoizes data 
   */
   async function fetchS3Data() {// fetches the json data from the web. Can be called anytime
    const data = (await fetch(//fetchs the data from the provided parameter. It then assigns the data in a format to the dat variable.
        "http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json"//parameter to grab the json from
    ).then((res) => res.json())) as CategoryObject;//once it gets the data together it sets the format to the format oft eh categoryObject template. i also joins the data together like a list

    return data;//returns the json data
}

async function getUrls() {
    // const data = await fetchS3Data();

    // return Object.values(data)
    //     .map((item) => item.url)
    //     .sort();

    const data = await fetchS3Data();// grabs the json data and saves it as a variable
    return Object.entries(data)// goes through all the entries of the JSON. it maps and sorts the data
        .map(([key, item]) => ({ key, url: item.url }))// maps the new data based on a key and item system. This specifically only mapes the name of the category with the url data
        .sort((a, b) => a.url.localeCompare(b.url)); // Sorting by URL. Sorts the urls in ascending order. 
}

export default async function CategoriesPage({// This is what displays the actual page to the user. it also grabs the url paramters from a slug string.
    params,
}: {
    params: {
        slug?: string[];
    };
}) {
    const slugs = params.slug || [];//gets the parameter value
    const urls = await getUrls();// gets all the category entries

    // console.log(urls);

    if (!urls) {//checks to see if url is null or not. does nothing if there is a value in url
        return <div>Loading...</div>;//displays a loading message to the user if there was no url
    }

    if (slugs.length === 1) {//checks to see if there is a parameter passed was passed or not
        return (//returns the category componets fitlered by a certain letter. This use the cpomponent AZrender to display this.
            <div>
                <AzRender letter={slugs[0]} />
            </div>
        );
    }

    if (slugs.length === 0) {//this is what the defualt for the page would like is returned. shows all entries
        return (
            <>
                <div className="flex flex-col items-center justify-center gap-6 py-10 md:py-12">{/** Centers the body top the center of the screen. Uses tailwind css to style the body, and fro different size screens*/}
                    <div className="inline-block max-w-2xl text-center">{/**This contains components to dynamically display all the categories. Uses tailwind css to style the body  */}
                        <h1 className="text-4xl font-bold pb-8">Categories</h1>{/**Displays the title of the page. Uses tailind css to stile it */}
                        <UrlsLetters />{/**Displays the letters for pagination between different letters. Allows user to click which letter they would like to start with*/}
                        {Object.entries(groupUrlsByFirstLetter(urls)).map(// This groups the topics with a certain letter. It uses the urls data to ort it out 
                            ([letter, urls]) => (//key to go thorught he group entries
                                <div // has the letter as a key. Uses tailwind css styling 
                                    key={letter}
                                    className="mt-8 first:mt-0 pb-8 border-b border-gray-200 dark:border-gray-700"
                                >
                                    <h2 className="text-2xl font-semibold mb-4">{/**displays the letter in uppercase. Uses Tailwind css styling */}
                                        {letter.toUpperCase()}{/**displays letter in uppercase */}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{/**displays the card componets in a grid like system. Uses Tailwind css styling. Varies depending size depending on screen size */}
                                        {urls.map((url) => (//maps the urls within the group of the beggining letter. 
                                            <Card //card component that comes from nextui. It holds they key for the card. It uses tailwind css for styling. 
                                            key={url.key}// key for the card
                                            className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"// tailwind css styling
                                        >
                                            <h2 className="text-xl font-bold">{/**Tailwind css stryling for the text */} 
                                                <Link // a link componet from next,js that works like the 'a href' links for html. This allows dynamic routing for the website 
                                                    href={`/categories/category/${url.url}`}//holds the value for the url link the userr wants to click. The url data from the entries works as a url parameter. This allows the user to dynamically go to the catepory pagee in more detail.
                                                    className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400"// Tailwind css styling when hovering over the text with the mouse.
                                                >
                                                    {url.key}
                                                    {/* displays the key data to the user. These are the categories foe the user to select */}
                                                </Link>
                                            </h2>
                                        </Card>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </>
        );
    }
}
