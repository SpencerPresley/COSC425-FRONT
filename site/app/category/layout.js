import { SideNav } from "@/components/side-nav";
import { Header, Footer } from "@/components/common";
import { Wrapper, PageWrapper, OuterWrapper } from "@/components/wrappers";

export default function CategoryLayout({ children }) {
  return (
    <OuterWrapper>
      <div className="bg-suMaroon flex h-full w-full">
        <div className="border-dashed border md:basis-1/4 pt-8">
          <SideNav />
        </div>
        <div className="basis-4/4 md:basis-2/4">
          <Wrapper>
            <PageWrapper>{children}</PageWrapper>
          </Wrapper>
        </div>
        <div className="v md:basis-1/4 border-dashed border">

        </div>
      </div>
    </OuterWrapper>
  );
}
