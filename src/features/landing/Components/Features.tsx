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
    <div className="flex w-full px-28 items-end justify-between">
      <div
        className={` flex px-8 py-8 w-1/2 gap-x-10 items-center cursor-pointer text-slate-400 rounded-2xl  ${
          selectedListItem === feature.id &&
          " text-slate-50 bg-gradient-to-r from-orange-light-theme to-orange-theme  font-bold"
        }`}
        onClick={() => setSelectedListItem(feature.id)}
      >
        <div className="bg-slate-400 rounded-full text-white w-8 h-8 flex justify-center items-center">
          {feature.id}
        </div>
        <div>
          <div className="text-xl font-bold">{feature.title}</div>
          <div className="text-sm my-3 tracking-wider">
            {feature.description}
          </div>
        </div>
      </div>
      {selectedListItem === feature.id && (
        <div className="w-1/2 absolute -right-1/4 -bottom-3/4   ">
          <img className="full md:w-1/3" src={feature.imageLink} />
        </div>
      )}
    </div>
  );
};

// const
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
    <div className="flex flex-col w-full items-center mb-44">
      <h1 className="text-4xl mt-28 mb-10 font-bold text-center tracking-wider">
        Data driven influencer marketing campaigns
      </h1>
      <div className="rounded-3xl border-2 border-orange-theme my-20 flex justify-center items-center   w-48 h-10 ">
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
