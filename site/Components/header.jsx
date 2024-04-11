import Link from "next/link";

import "./styles/styles.css";

export const Header = () => {
  return (
    <div class="flavor-header">
      <header class="site-header">
        <h1>Salsibury Research</h1>
        <nav class="navigation">
          <Link href="../app/page.js" className="nav-link">
            Home
          </Link>
          <Link href="/html/Version2/TopicAZ.html" className="nav-link">
            Topic A-Z
          </Link>
          <Link href="/html/Version2/FacultyAZ.html" className="nav-link">
            Faculty Contact
          </Link>
          <Link href="/html/Version2/ArticleAZ.html" className="nav-link">
            Articles A-Z
          </Link>
        </nav>
      </header>
    </div>
  );
};
