import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}
const Logo = ({ className }: LogoProps) => {
  return (
    <Link to={"/"} className="outline-none">
      <h1
        className={`relative justify-center inline-block w-64 text-6xl italic font-bold tracking-wider text-center text-transparent font-cursive bg-gradient-to-r from-teal-400 to-teal-700 bg-clip-text   ${className}`}
      >
        PoloBolo
      </h1>
    </Link>
  );
};

export default Logo;
