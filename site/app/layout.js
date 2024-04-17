import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer} from "../components/common";
import { Wrapper, PageWrapper, OuterWrapper } from "../components/wrappers"
import { SideNav } from "../components/side-nav"
const inter = Inter({ subsets: ["latin"], color: 'bg-suMaroon' });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*   */}
      <body className=" bg-suMaroon">
        <OuterWrapper>
          <div className="bg-suMaroonflex-grow grid grid-cols-1 md:grid-cols-7">
            <div className="col-span-2">
              <SideNav/>
            </div>
            <div className="col-span-5">
              <Wrapper>
                <PageWrapper>{children}</PageWrapper>
              </Wrapper>
            </div>
          </div>
          <div>
            <Footer/>
          </div>
        </OuterWrapper>
      </body>
      
    </html>
  );
}