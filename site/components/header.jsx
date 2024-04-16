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
          <Link href="/test2" className="nav-link">
            test2
          </Link>
          <Link href="/category" className="nav-link">
            Categories
          </Link>
        </nav>
      </div>
    </div>
  );
};
