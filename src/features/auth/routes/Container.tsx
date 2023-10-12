import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../components/Logo";
interface ContainerProps {
  children: ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return (
    <div className="flex flex-col w-screen h-screen md:flex-row font-montserrat">
      <div className="flex items-center justify-center h-2/5 md:h-full md:w-2/5 bg-gradient-to-b from-teal-200 to-teal-500 ">
        <div className="relative ">
          <FontAwesomeIcon
            icon={faBolt}
            className="absolute text-teal-500 text-9xl left-1/3 -top-1/2"
          />
          <Logo className="text-white cursor-default" />
        </div>
      </div>
      <div className="flex items-center justify-center w-full md:h-full md:w-3/5">
        {children}
      </div>
    </div>
  );
};

export default Container;
