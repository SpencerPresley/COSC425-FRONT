import { SideNav } from "@/components/side-nav";
import { Header, Footer } from "@/components/common";
import { Wrapper, PageWrapper, OuterWrapper } from "@/components/wrappers";

export default function CategoryLayout({ children }) {
  return (
    <OuterWrapper>
      <div className="bg-suMaroon md:flex h-full w-full">
        <div className="hidden md:block basis-1/12">

        </div>
        <div className="hidden md:block basis-2/12 pt-8">
          <SideNav />
        </div>
        <div className="md:basis-6/12">
          <Wrapper>
            <PageWrapper>{children}</PageWrapper>
          </Wrapper>
        </div>
        <div className="hidden md:block basis-2/12">

        </div>
      </div>
    </OuterWrapper>
  );
}
