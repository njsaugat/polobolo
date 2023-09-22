import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorElement from "../components/ErrorElement";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import Container from "../features/auth/Container";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    // children: [
    //   {
    //     path: "/login",
    //     element: <Login />,
    //   },
    // ],
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
