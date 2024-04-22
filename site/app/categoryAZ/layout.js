import { SideNav } from "@/components/side-nav";
import { Header, Footer } from "@/components/common";
import { Wrapper, PageWrapper, OuterWrapper } from "@/components/wrappersAZ";

export default function CategoryLayout({ children }) {
  return (
    <OuterWrapper>
      <div className="bg-suMaroon flex-grow grid grid-cols-1 md:grid-cols-7 w-full">
        <div className="col-span-2">
          {/* <SideNav /> */}
        </div>
        <div className="col-span-5">
          <Wrapper>
            <PageWrapper>{children}</PageWrapper>
          </Wrapper>
        </div>
      </div>
    </OuterWrapper>
  );
}
