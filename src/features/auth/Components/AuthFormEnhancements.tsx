import { Link } from "react-router-dom";

type FormType = { formType: "signup" | "login" };
const AuthFormEnhancements = ({ formType }: FormType) => (
  <>
    <div className="text-center">
      <a
        className="inline-block text-sm text-teal-500 align-baseline hover:text-teal-800"
        href="#"
      >
        Forgot Password?
      </a>
    </div>
    <div className="text-sm text-center">
      Already have an account? &nbsp;
      <Link
        className="inline-block text-teal-500 capitalize align-baseline hover:text-teal-800"
        to={`/${formType}`}
      >
        {formType} !
      </Link>
    </div>
  </>
);
export default AuthFormEnhancements;
