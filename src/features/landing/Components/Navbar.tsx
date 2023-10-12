import Logo from "../../../components/Logo";
import { Button } from "../../../components/Elements/Button";
import { Link } from "react-router-dom";
import useAuthCheck from "../../../hooks/useAuthCheck";
import useLogoutUser from "../../../features/auth/api/useLogoutUser";
const Navbar = () => {
  // useAuthCheck()
  const isLoggedIn = useAuthCheck();
  const { mutate, error, isLoading } = useLogoutUser();
  return (
    <div className="flex items-center justify-between w-screen mt-3 mb-10 overflow-x-hidden mx-28">
      <ul className="flex items-center justify-around md:w-2/3 lg:w-1/3 md:justify-between">
        <Logo />
        <Link to="/home">
          <li>Home</li>
        </Link>
        <li>Brands</li>
        <li>Influencers</li>
      </ul>
      <ul className="flex items-center w-1/3 md:w-1/2 lg:w-1/3 ">
        {isLoggedIn ? (
          // <Link to="/login">
          <Button
            className="p-3 mx-3 font-bold bg-gradient-to-r from-teal-50 to-slate-100"
            isLoading={isLoading}
            onClick={() => {
              // TODO: Open a modal dialog box to confirm
              mutate();
            }}
          >
            Logout
          </Button>
        ) : (
          // </Link>
          <>
            <Link to="/login">
              <Button className="p-3 mx-3 font-bold bg-gradient-to-r from-teal-50 to-slate-100">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="font-bold">Signup</Button>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
