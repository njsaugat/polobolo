import GraphImage from "../../../assets/images/png/graph-visual.png";
import MailingList from "./MailingList";
import AppStore from "../../../assets/images/app-store.svg";
import GooglePlay from "../../../assets/images/google-play.svg";
const Title = () => {
  return (
    <div className="flex flex-col justify-around w-screen my-20 md:flex-row mx-28">
      <section className="w-1/2 md:">
        <h1 className="text-6xl font-bold leading-normal tracking-wide">
          Supercharge your online presence with
          <div className="text-orange-theme"> PoloBolo</div>
        </h1>
        <h3 className="mt-10 mb-8 text-2xl leading-normal text-slate-500">
          Unlock the power of influencers across diverse audiences. Elevate you r
          social media game!
        </h3>
        <MailingList />
        <div className="flex gap-x-3">
          <img src={AppStore} />
          <img src={GooglePlay} />
        </div>
      </section>
      <div className="w-full md:w-1/2">
        <img
          src={GraphImage}
          alt="graph-visual-png"
          className="md:w-2/3 lg:w-1/2"
        />
      </div>
    </div>
  );
};

export default Title;
