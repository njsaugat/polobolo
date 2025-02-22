import { useTranslation } from "react-i18next";
import AppStore from "../../../assets/images/app-store.svg";
import GooglePlay from "../../../assets/images/google-play.svg";
import GraphImage from "../../../assets/images/png/graph-visual.png";
import LoadImage from "../../../components/Elements/LoadImage";
import MailingList from "./MailingList";
import GradientTexts from "../../../components/Shared/GradientText";
import { motion } from "framer-motion";
import { Button } from "../../../components/Elements/Button";
const Title = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col justify-around w-screen mx-10 my-20 md:flex-row md:mx-28">
        <section className="w-1/2 md:">
          <h1 className="text-5xl font-bold leading-tight tracking-wide md:leading-normal md:text-6xl">
            {t("landingPage.tagline")}
            <span>
              <GradientTexts className="font-serif" content="AI" />
            </span>
            <div className="">{/* Polobolo */}</div>
          </h1>
          <h3 className="mt-10 mb-8 text-2xl leading-normal text-slate-500">
            {t("landingPage.heroText")}
          </h3>
          {/* <MailingList /> */}
          <div className="flex gap-x-3">
            <Button className="box">Start for free</Button>
            <Button variant="inverse" className="shadow-2xl">Get demo</Button>
            {/* <LoadImage src={AppStore} /> */}
            {/* <LoadImage src={GooglePlay} /> */}
          </div>
        </section>
        <motion.div
          initial={{ scale: 1 }}
          animate={{
            y: [-50, 50, -50],
            transition: {
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
          className="w-full md:w-1/2"
        >
          <LoadImage
            src={GraphImage}
            alt="graph-visual-png"
            className="md:w-2/3 lg:w-1/2"
          />
        </motion.div>
      </div>
      {/* <div  className="box">Login    </div> */}
    </>
  );
};

export default Title;
