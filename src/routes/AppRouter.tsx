import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorElement from "../components/ErrorElement";
import Login from "../features/auth/routes/Login";
import Signup from "../features/auth/routes/Signup";
import Container from "../features/auth/routes/Container";
import Home from "../features/home/Home";
import LandingPage from "../features/landing/LandingPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/signup",
    element: (
      <Container>
        <Signup />
      </Container>
    ),
  },
  {
    path: "/login",
    element: (
      <Container>
        <Login />
      </Container>
    ),
  },
]);

export default appRouter;
