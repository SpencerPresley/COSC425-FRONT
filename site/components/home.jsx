import { CatCard } from "./catInfoCard";
import Image from 'next/image';

import "./styles/style2.css";

export const Home = () => {
    return (
        <div>
            <Image
                src="/pictures/homepage.png" // Path to your image
                alt="Description of the image" // Alternative text for accessibility
                width={500} // Desired width of the image
                height={334} // Desired height of the image
                layout="responsive" // Optional: Adjusts the layout behavior of the image
            />
        </div>
    );
};