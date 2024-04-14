import Link from "next/link";

import "./styles/styles.css";

export const Header = () => {
  return (
    <div className="flavor-header">
      <div className="site-header">
        <h1>Salsibury Research</h1>
        <nav className="navigation">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/test3Jude" className="nav-link">
            Topic A-Z
          </Link>
          <Link href="/html/Version2/FacultyAZ.html" className="nav-link">
            Faculty Contact
          </Link>
          <Link href="/html/Version2/ArticleAZ.html" className="nav-link">
            Articles A-Z
          </Link>
        </nav>
      </div>
    </div>
  );
};
