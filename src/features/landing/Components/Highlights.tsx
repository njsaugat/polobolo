import { useTranslation } from "react-i18next";
import Analytics from "../../../assets/images/png/analytics.png";
import AuditCards from "../../../assets/images/png/audit_cards.png";
import PostPerformance from "../../../assets/images/png/post-performance.png";
import { useMemo } from "react";

const Highlights = () => {
  const { t } = useTranslation();
  const analytics = useMemo(
    () => [
      {
        image: Analytics,
        text: t("landingPage.analytics"),
      },
      {
        image: AuditCards,
        text: t("landingPage.audit"),
      },
      {
        image: PostPerformance,
        text: t("landingPage.performance"),
      },
    ],
    [t]
  );
  return (
    <div className="flex flex-col justify-center mx-28">
      <h1 className="my-10 text-4xl font-bold tracking-wider text-center">
        {t("landingPage.highlights")}
      </h1>
      <div className="flex flex-wrap justify-center lg:justify-between ">
        {analytics.map((analytic) => {
          return (
            <div
              className="flex flex-col items-center justify-center"
              key={analytic.image}
            >
              <div className="my-5 w-72 ">
                <img src={analytic?.image} alt="Analytics" />
              </div>
              <p className="my-2 text-xl font-bold">{analytic?.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Highlights;
