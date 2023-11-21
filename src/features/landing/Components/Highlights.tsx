import Analytics from "../../../assets/images/png/analytics.png";
import AuditCards from "../../../assets/images/png/audit_cards.png";
import PostPerformance from "../../../assets/images/png/post-performance.png";

const analytics = [
  {
    image: Analytics,
    text: "Advanced Analytics to Boost Your ROI",
  },
  {
    image: AuditCards,
    text: "In-House Valuation Tools",
  },
  {
    image: PostPerformance,
    text: "Campaign Performance Tracker",
  },
];
const Highlights = () => {
  return (
    <div className="flex flex-col justify-center mx-28">
      <h1 className="my-10 text-4xl font-bold tracking-wider text-center">
        What we bring to the table
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
