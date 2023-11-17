import { useState } from "react";

import { features, Feature } from "../utils/features";

type brandInfluencer = "brand" | "influencer";

type featureProps = {
  feature: Feature;
  selectedListItem: number;
  setSelectedListItem: React.Dispatch<React.SetStateAction<number>>;
};

const FeatureItem: React.FC<featureProps> = ({
  feature,
  selectedListItem,
  setSelectedListItem,
}) => {
  return (
    <div className="flex items-end justify-between w-full px-28">
      <div
        className={` flex px-8 py-8 w-1/2 gap-x-10 items-center cursor-pointer text-slate-400 rounded-2xl  ${
          selectedListItem === feature.id &&
          " text-slate-50 bg-gradient-to-r from-orange-light-theme to-orange-theme  font-bold"
        }`}
        onClick={() => setSelectedListItem(feature.id)}
      >
        <div className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-slate-400">
          {feature.id}
        </div>
        <div>
          <div className="text-xl font-bold">{feature.title}</div>
          <div className="my-3 text-sm tracking-wider">
            {feature.description}
          </div>
        </div>
      </div>
      {selectedListItem === feature.id && (
        <div className="absolute w-1/2 -right-1/4 -bottom-3/4 ">
          <img className="full md:w-1/3" src={feature.imageLink} />
        </div>
      )}
    </div>
  );
};

const Features = () => {
  const [selectedBrandInfluencer, setSelectedBrandInfluencer] =
    useState<brandInfluencer>("brand");
  const [selectedListItem, setSelectedListItem] = useState(1);

  const handleBrandInfluencerChange = (value: brandInfluencer) => {
    if (selectedBrandInfluencer !== value) {
      setSelectedBrandInfluencer(value);
      setSelectedListItem(1);
    }
  };
  return (
    <div className="flex flex-col items-center w-full mb-44">
      <h1 className="mb-10 text-4xl font-bold tracking-wider text-center mt-28">
        Data driven influencer marketing campaigns
      </h1>
      <div className="flex items-center justify-center w-48 h-10 my-20 border-2 rounded-3xl border-orange-theme ">
        <div
          className={`text-orange-theme  ${
            selectedBrandInfluencer === "brand" &&
            "bg-gradient-to-b from-orange-light-theme to-orange-theme rounded-3xl  text-white"
          }  h-full  w-1/2 flex justify-center items-center  cursor-pointer`}
          onClick={() => {
            handleBrandInfluencerChange("brand");
          }}
        >
          Brand
        </div>
        <div
          className={`text-orange-theme ${
            selectedBrandInfluencer === "influencer" &&
            "bg-gradient-to-b from-orange-light-theme to-orange-theme rounded-3xl text-white"
          } w-1/2 flex h-full justify-center items-center cursor-pointer`}
          onClick={() => {
            handleBrandInfluencerChange("influencer");
          }}
        >
          Influencer
        </div>
      </div>
      <div className="w-full">
        {features[selectedBrandInfluencer].map((feature) => {
          return (
            <FeatureItem
              key={feature.id}
              feature={feature}
              selectedListItem={selectedListItem}
              setSelectedListItem={setSelectedListItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Features;
