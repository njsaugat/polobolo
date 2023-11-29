
const TypingChat = () => {
  return (
    <div className="flex items-center justify-center w-20 h-10 px-2 py-3 mb-2 ml-10 transition-all duration-300 rounded-t-full rounded-br-full gap-x-2 bg-gradient-to-b from-slate-100 to-slate-300 ">
      {new Array(3).fill(1).map((dot, index) => (
        <span
          key={index + dot}
          className={`w-3 h-3  animation${
            index + 1
          } rounded-full  bg-gradient-to-b from-teal-100 to-teal-300`}
        ></span>
      ))}
    </div>
  );
};

export default TypingChat;
