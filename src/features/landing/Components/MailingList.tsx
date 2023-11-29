import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Elements/Button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const MailingList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mailingInputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={() => {
        navigate(`/signup/${mailingInputRef.current?.value}`);
      }}
      className="flex p-1 mb-10 border-2 rounded-lg border-slate-300 w-80"
    >
      <input
        ref={mailingInputRef}
        type="text"
        placeholder={t("landingPage.signupMailingList")}
        className="w-3/4 p-2 text-xs border-0 outline-none"
      />
      <Button type="submit">{t("landingPage.signup")}</Button>
    </form>
  );
};

export default MailingList;
