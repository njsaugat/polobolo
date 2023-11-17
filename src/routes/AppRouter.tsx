import {
  RouterProvider,
  createBrowserRouter,
  useRoutes,
} from "react-router-dom";
import App from "../App";
import ErrorElement from "../components/Shared/ErrorElement";
import Login from "../features/auth/Components/Login";
import Signup from "../features/auth/Components/Signup";
import Container from "../features/auth/Components/Container";
import Home from "../features/posts/Components/Posts";
import LandingPage from "../features/landing/LandingPage";
import UserProfile from "../features/user/Components/UserProfile";
import UserProfileAbout from "../features/user/Components/UserProfileAbout";
import Posts from "../features/posts/Components/Posts";
import PostsByTag from "../features/posts/Components/PostsByTag";
import Bookmarks from "../features/posts/Components/BookmarkedPosts";
import Settings from "../features/user/Components/Settings";
import useAuthCheck from "../hooks/useAuthCheck";
import UserDetails from "../features/user/Components/UserDetails";
import Chat from "../features/chat/components/Chat";
import ChatSection from "../features/chat/components/ChatSection";

export const AppRoutes = () => {
  const loggedIn = useAuthCheck();

  const routes = loggedIn ? protectedRoutes : publicRoutes;

  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} />;
};

const publicRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <LandingPage />,
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
    ],
  },
];

const protectedRoutes = [
  {
    path: "/login",
    element: (
      <Container>
        <Login />
      </Container>
    ),
  },

  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/chats",
        element: <Chat />,
        children: [{ path: ":chatId", element: <ChatSection /> }],
      },
      {
        path: "/onboarding",
        element: (
          <Container>
            <UserDetails isOnboarding={true} />
          </Container>
        ),
      },
      {
        path: "/home",
        element: <Posts />,
      },
      {
        path: "posts/tags/:tag",
        element: <PostsByTag />,
      },
      {
        path: "user/:username",
        element: <UserProfile />,
        children: [
          {
            index: true, // Use the index property to specify the default route
            element: <UserProfileAbout />,
          },
          {
            path: "about", // This can be used as well for the about page
            element: <UserProfileAbout />,
          },
          {
            path: "posts",
            element: <Posts />,
          },
          {
            path: "bookmarks",
            element: <Bookmarks />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
];
