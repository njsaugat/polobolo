import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "./components/Logo";
import LandingPage from "../src/features/landing/LandingPage";
import Navbar from "./features/landing/Components/Navbar";

const App = () => {
  return (
    <div className="min-w-full overflow-x-hidden font-montserrat">
      {/* <LandingPage/> */}
      <Navbar/>
      <Outlet />
      {/* <div className="flex flex-col h-full text-5xl ">
        Main
      </div> */}
    </div>
  );
};

export default App;
