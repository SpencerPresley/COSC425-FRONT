import { SideNav } from "@/components/side-nav";
import { Header, Footer } from "@/components/common";
import { Wrapper, PageWrapper, OuterWrapper } from "@/components/wrappersAZ";

export default function CategoryLayout({ children }) {//layout for the category AZ layout
  return (
    <OuterWrapper>
      <div className="bg-suMaroon flex-grow grid grid-cols-1 md:grid-cols-5 w-full">
        {/* <div className="col-span-2">{/*future filter later*/}
          {/* <SideNav /> */}
        {/*</div> */}
        <div className="col-span-5">{/*topic az card display component*/}
          <Wrapper>
            <PageWrapper>{children}</PageWrapper>
          </Wrapper>
        </div>
      </div>
    </OuterWrapper>
  );
}
