import Link from "next/link";
import Image from "next/image"; // Import if not already imported
import styles from "../styles/navbarStyles.css";

export const Navbar = () => {
    return (
<div className="navbar bg-neutral text-neutral-content">
  <div className="navbar-start">

  </div>
  <div className="navbar-center">
  <Link href="/" className="nav-link relative"> Home
    <div className="tooltip absolute invisible bg-white p-1 -mt-12 ml-[-50%] w-auto min-w-max opacity-0 transition-opacity duration-300">
        <Image src="../app/pictures/preview.png" alt="Home Page Preview" width={200} height={100} />
    </div>
    </Link>  
    </div>
  <div className="navbar-end">
  </div>
</div>
    )
}