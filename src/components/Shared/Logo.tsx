import { Link } from "react-router-dom";
import GradientText from "./GradientText";

export interface LogoProps {
  className?: string;
  content?: string;
}
const Logo = ({ className, content = "PoloBolo" }: LogoProps) => {
  return (
    <Link to={"/"} className="outline-none">
      <GradientText className={className} content={content} />
    </Link>
  );
};

export default Logo;
