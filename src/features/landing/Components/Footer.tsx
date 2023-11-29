import { useTranslation } from "react-i18next";
import Logo from "../../../components/Shared/Logo";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center w-screen py-20 bg-gradient-to-b from-teal-50 to-teal-100 px-28">
      <div className="-translate-x-10">
        <Logo />
      </div>
      <div className="my-5">
        <p>
          {t("landingPage.copyright")} © {new Date().getFullYear()} Polobolo
          LLC.
        </p>
        <p>{t("landingPage.rights")}</p>
      </div>
    </div>
  );
};

export default Footer;
