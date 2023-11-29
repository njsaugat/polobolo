import ShimmerComment from "./ShimmerComment";

const ShimmerChatSection = () => {
  return (
    <>
      {new Array(10).fill(1).map((value, index) => (
        <div key={value + index} className={`flex flex-col w-full px-5 py-1 `}>
          <ShimmerComment
            isChat={true}
            key={value + index}
            className={
              index % 2 === 1
                ? "flex-row-reverse  items-end justify-center teal"
                : "flex-row  "
            }
          />
        </div>
      ))}
    </>
  );
};

export default ShimmerChatSection;
