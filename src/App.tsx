import React from "react";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores/store";
import Logo from "./components/Logo";

const App = () => {
  return (
    <div className="overflow-x-hidden font-montserrat">
      <Provider store={store}>
        <Outlet />
        <div className="text-5xl">
          <Logo/>
        </div>
      </Provider>
    </div>
  );
};

export default App;
