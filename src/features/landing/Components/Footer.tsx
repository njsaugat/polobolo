import Logo from "../../../components/Shared/Logo";
import LinkedinLogo from "../../../assets/images/w-linkedin.svg";
import InstagramLogo from "../../../assets/images/w-instagram.svg";
import TwitterLogo from "../../../assets/images/w-twitter.svg";
const Footer = () => {
  return (
    <div className="flex justify-between w-screen py-20 text-white bg-gradient-to-b from-orange-light-theme to-orange-theme px-28">
      <div className="flex flex-col w-1/2 leading-relaxed">
        <Logo />
        <div className="my-5">
          <p>Copyright © {new Date().getFullYear()} Nfluence LLC.</p>
          <p>All Rights Reserved.</p>
        </div>
        <div className="flex gap-x-3">
          <img src={LinkedinLogo} alt="lin" />
          <img src={InstagramLogo} alt="twit" />
          <img src={TwitterLogo} alt="inst" />
        </div>
      </div>
      <div className="flex flex-col items-end w-1/5 font-bold">
        <div className="text-xl place-items-start ">Company</div>
        <div className="flex flex-wrap w-1/2 gap-2">
          <div>Brands</div>
          <div>Privacy Policy</div>
          <div>Influencers</div>
          <div>Terms of service</div>
          <div>FAQ</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
