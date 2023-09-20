import React from "react";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Outlet />
        <div className="text-5xl">Hello</div>
      </Provider>
    </>
  );
};

export default App;
