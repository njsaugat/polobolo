import Footer from "./Components/Footer";
import Highlights from "./Components/Highlights";
import MarketingFuture from "./Components/MarketingFuture";
import Navbar from "./Components/Navbar";
import Title from "./Components/Title";

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden font-montserrat">
      <Navbar />
      <Title />
      <Highlights />
      <MarketingFuture />
      <Footer />
    </div>
  );
};

export default LandingPage;
