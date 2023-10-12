import GraphImage from "../../../assets/images/graph-visual.png";
import MailingList from "./MailingList";
import AppStore from "../../../assets/images/app-store.svg";
import GooglePlay from "../../../assets/images/google-play.svg";
const Title = () => {
  return (
    <div className="flex flex-col justify-around w-screen my-20 md:flex-row mx-28">
      <section className="w-1/2 md:">
        <h1 className="text-6xl font-bold leading-normal tracking-wide">
          Grow Your Business with
          <div className="text-orange-theme"> Micro-Influencers.</div>
        </h1>
        <h3 className="mt-10 mb-8 text-2xl leading-normal text-slate-500">
          Save time & money by gaining access to micro-influencers of all
          audiences and the actionable insights needed to drive sales and ROI.
        </h3>
        <MailingList />
        <div className="flex gap-x-3">
          <img src={AppStore} />
          <img src={GooglePlay} />
        </div>
      </section>
      <div className="w-full md:w-1/2">
        <img src={GraphImage} alt="graph-visual-png" className="md:w-2/3 lg:w-1/2" />
      </div>
    </div>
  );
};

export default Title;
