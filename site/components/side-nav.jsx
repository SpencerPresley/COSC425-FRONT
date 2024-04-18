import Link from "next/link";
  

export const SideNav = () => {

    let cats = ["Business", "Behavioral Sciences"]

    return (
      <div className="md:w-full bg-suMaroon h-full flex-1 border-r border-zinc-200 hidden md:flex">
        <div className="flex flex-col space-y-6 w-full">
            <Link
                href="/"
                className="flex flex-row bg-white space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
            >
                <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
                <span className="font-bold text-xl hidden md:flex">Salisbury Research</span>
            </Link>
            <div className="flex flex-col space-y-2 md:px-6 overflow-scroll max-h-screen">
              {cats.map((item, index) => (
                <div key={index} className="shrink-0 border-dashed border w-full h-24 text-center my-auto">
                  <h2 className="text-white text-xl text-bold">{item}</h2>
                </div>
              ))}
            </div> 
        </div>
      </div>
    );
};