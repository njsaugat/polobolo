import { useTranslation } from "react-i18next";
import FreeAccess from "../../../assets/images/free-access.svg";
import MailingList from "./MailingList";
const MarketingFuture = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col-reverse items-center p-10 mt-20 md:p-20 lg:p-40 md:flex-row bg-orange-dim ">
      <div className="w-full md:w-1/2 ">
        <h2 className="my-5 text-4xl font-bold leading-snug tracking-wider">
          {t("landingPage.marketingFuture")}
        </h2>
        <MailingList />
      </div>
      <div className="flex justify-end w-1/2">
        <img src={FreeAccess} alt="free-access" className="w-52" />
      </div>
    </div>
  );
};

export default MarketingFuture;
