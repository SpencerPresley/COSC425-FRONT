import Link from "next/link";

export async function generateStaticParams() {
  const data = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json").then((res) => res.json());

  return Object.keys(data).map((category) => ({
    category: data[category].url,
  }));
}

export const SideNav = ({ params}) => {
    const { categoryUrls } = params;
    return (
      <div className="md:w-full bg-suMaroon h-full flex-1 border-r border-zinc-200 hidden md:flex">
        <div className="flex flex-col space-y-6 w-full">
            <Link
                href="/"
                className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
            >
                <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
                <span className="font-bold text-xl hidden md:flex">Logo</span>
            </Link>
            {categoryUrls.map((url) => (
            <div className="flex flex-col space-y-2 md:px-6">
              <div className="border-dashed border w-full h-24">
                    <Link href={`${url}`}>
                      {url
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                    </Link>
              </div>
            </div> 
            ))}
        </div>
      </div>
    );
};