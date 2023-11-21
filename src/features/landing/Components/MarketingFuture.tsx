import MailingList from "./MailingList";
import FreeAccess from "../../../assets/images/free-access.svg";
const MarketingFuture = () => {
  return (
    <div className="flex flex-col-reverse items-center p-20 my-20 md:flex-row bg-orange-dim mx-28 rounded-3xl ">
      <div className="w-1/2 ">
        <h2 className="my-5 text-4xl font-bold leading-snug tracking-wider">
          Gain free access to the future of social media
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
