import ShimmerComment from "./ShimmerComment";

const ShimmerChatList = () => {
  return (
    <>
      {new Array(10).fill(1).map((value, index) => (
        <div key={value + index} className="w-full px-5 py-1 ">
          <ShimmerComment isChat={true} key={value + index} />
        </div>
      ))}
    </>
  );
};

export default ShimmerChatList;
