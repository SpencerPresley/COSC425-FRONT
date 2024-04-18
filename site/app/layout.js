import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer} from "@/components/common";
import { Wrapper, PageWrapper, OuterWrapper } from "@/components/wrappers"
import { SideNav } from "@/components/side-nav"
const inter = Inter( { subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*   */}
      <body className ={inter.className}>
        <OuterWrapper>
          <div className="bg-suMaroon flex-grow grid grid-cols-1 md:grid-cols-7 h-full w-full">
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