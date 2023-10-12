import { Button } from "../../../components/Elements/Button";

const MailingList = () => {
  return (
    <div className="flex p-1 mb-10 border-2 rounded-lg border-slate-300 w-80">
      <input
        type="text"
        placeholder="Your email address."
        className="w-3/4 p-2 text-xs border-0 outline-none"
      />
      {/* <SignupButton /> */}
      <Button>Signup</Button>
    </div>
  );
};

export default MailingList;
