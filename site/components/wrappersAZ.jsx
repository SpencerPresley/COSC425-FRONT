export const Wrapper = ({ children }) => {

    return (
        <div className="bg-suMaroon flex flex-col sm:border-r sm:border-zinc-700">
            {children}
        </div>
    );
};

export const PageWrapper = ({ children }) => {
    return (
      <div className="bg-suMaroon flex flex-col pt-10 px-10 space-y-2 bg-zinc-100 flex-grow pb-4">
        {children}
      </div>
    );
};

export const OuterWrapper = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-suMaroon w-full h-full">
          {children}
      </div>
    </>
  );
};