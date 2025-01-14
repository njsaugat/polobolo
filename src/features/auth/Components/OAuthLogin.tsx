import { Button } from "../../../components/Elements/Button";

const PlatformTypes = ["google", "github"] as const;
type PlatformType = (typeof PlatformTypes)[number];
import GoogleIcon from "../../../assets/images/google.svg";
import GithubIcon from "../../../assets/images/github.svg";
import LoadImage from "../../../components/Elements/LoadImage";
const OAuthLogin = ({ platform }: { platform: PlatformType }) => {
  const handleGoogleLogin = async () => {
    const googleLoginUrl = `http://localhost:8080/api/v1/users/${platform}`;
    const width = 600,
      height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const authWindow = window.open(
      googleLoginUrl,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <Button
      variant="fulltransparent"
      className="flex self-center w-full border-2 rounded-full"
      onClick={handleGoogleLogin}
    >
      <div className="flex items-center justify-center ">
        <LoadImage
          src={platform === "google" ? GoogleIcon : GithubIcon}
          className="w-6 mr-2"
          alt="icon"
        />
        Login with<span className="capitalize">&nbsp;{platform}</span>
      </div>
    </Button>
  );
};

export default OAuthLogin;
