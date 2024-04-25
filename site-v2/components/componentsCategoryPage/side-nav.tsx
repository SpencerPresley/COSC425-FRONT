import Link from "next/link";

async function getUrls() {
  const res = await fetch("http://cosc425-category-data.s3.amazonaws.com/processed_category_data.json");
  const data = await res.json();

  // Extract the 'url' property from each category
  const urls = Object.values(data).map((category: any) => category.url);

  return urls;
}

export const SideNav = async () => {
  const categoryUrls = await getUrls();
  categoryUrls.sort()

  return (
    <div className="md:w-full bg-black h-full hidden md:flex">
      {/* ... */}
      <div className="flex flex-col space-y-2 md:px-6 overflow-scroll max-h-screen">
        <div className="shrink-0 w-full text-center my-auto">
          <h1 className="text-white text-xl text-bold">Category A-Z</h1>
        </div>
        {categoryUrls.map((url) => (
          <div
            key={url}
            className="shrink-0 w-full text-center my-auto"
          >
            <Link href={`/category/${url}`}>
              
                <h2 className="text-white text-md">
                  {url
                    .split("-")
                    .map(
                      (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </h2>
              
            </Link>
          </div>
        ))}
      </div>
      {/* ... */}
    </div>
  );
};