import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type FormType = { formType: "signup" | "login" };
const AuthFormEnhancements = ({ formType }: FormType) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="text-center">
        <a
          className="inline-block text-sm text-teal-500 align-baseline hover:text-teal-800"
          href="#"
        >
          {t("authPage.forgot")}
        </a>
      </div>
      <div className="text-sm text-center">
        {formType === "login"
          ? t("authPage.oldAccount")
          : t("authPage.newAccount")}{" "}
        &nbsp;
        <Link
          className="inline-block text-teal-500 capitalize align-baseline hover:text-teal-800"
          to={`/${formType}`}
        >
          {t(`landingPage.${formType}`)} !
        </Link>
      </div>
    </>
  );
};
export default AuthFormEnhancements;
