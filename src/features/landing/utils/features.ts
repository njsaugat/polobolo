import CategoryChoose from "../../../assets/images/category-choose.png";
import ConnectSocial from "../../../assets/images/connect-social.png";
import Deal from "../../../assets/images/deal.png";
import InfluencerCategory from "../../../assets/images/influencer-category.png";
import InfluencerOffer from "../../../assets/images/influencer-offer.png";
import ProfileAudit from "../../../assets/images/profile-audit.png";
import RecommendedInfluencer from "../../../assets/images/recommend-influencer.png";

export type Feature = {
  id: number;
  title: string;
  description: string;
  imageLink: string;
};

export type FeaturesData = {
  brand: Feature[];
  influencer: Feature[];
};

export const features: FeaturesData = {
  brand: [
    {
      id: 1,
      title: "Choose Your Category",
      description: "Select the industry that best describes your business",
      imageLink: CategoryChoose,
    },
    {
      id: 2,
      title: "Browse Recommended Influencers",
      description:
        "Quickly discover influencers that best align with your brand",
      imageLink: RecommendedInfluencer,
    },
    {
      id: 3,
      title: "Get Simplified Analytics",
      description:
        "Easily understand which influencers will bring you the most value",
      imageLink: ProfileAudit,
    },
    {
      id: 4,
      title: "Make a Deal",
      description: "Once you’ve found the right influencer, send an offer!",
      imageLink: Deal,
    },
  ],

  influencer: [
    {
      id: 1,
      title: "Choose Your Category",
      description: "Select the industries that best align with your content",
      imageLink: InfluencerCategory,
    },
    {
      id: 2,
      title: "Connect Your Socials",
      description: "Quickly connect your social media accounts",
      imageLink: ConnectSocial,
    },
    {
      id: 3,
      title: "Make a Deal",
      description:
        "Sit back and watch brands come to you. Accept, decline, or negotiate offers",
      imageLink: InfluencerOffer,
    },
  ],
};
