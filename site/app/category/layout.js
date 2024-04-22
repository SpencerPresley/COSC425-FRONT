import { SideNav } from "@/components/side-nav";
import { Header, Footer } from "@/components/common";
import { Wrapper, PageWrapper, OuterWrapper } from "@/components/wrappers";

export default function CategoryLayout({ children }) {
  return (
    // <OuterWrapper>
      <div className="bg-black flex h-full w-full">
        <div className="md:basis-1/4 pt-8">
          <SideNav />
        </div>
        <div className="basis-4/4 md:basis-2/4 mt-5 mb-20">
          {/* <Wrapper> */}
            {/* <PageWrapper>{children}</PageWrapper> */}
          {/* </Wrapper> */}
          {children}
        </div>
        <div className=" md:basis-1/4">
          <p></p>
        </div>
      </div>
    // </OuterWrapper>
  );
}
