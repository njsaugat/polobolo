import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorRouteElement from "../components/Shared/ErrorRouteElement";
import { FallbackErrorBoundary } from "../components/Shared/FallbackErrorBoundary";
import TestErrorBoundary from "../components/Shared/TestErrorBoundary";
import ShimmerChat from "../components/Shimmer/ShimmerChat";
import ShimmerChatSection from "../components/Shimmer/ShimmerChatSection";
import ShimmerPosts from "../components/Shimmer/ShimmerPosts";
import ShimmerProfile from "../components/Shimmer/ShimmerProfile";
import Container from "../features/auth/Components/Container";
import Login from "../features/auth/Components/Login";
import Signup from "../features/auth/Components/Signup";
import LandingPage from "../features/landing/LandingPage";
import Settings from "../features/user/Components/Settings";
import UserDetails from "../features/user/Components/UserDetails";
import UserProfileAbout from "../features/user/Components/UserProfileAbout";
import useAuthCheck from "../hooks/useAuthCheck";

const Chat = lazy(() => import("../features/chat/components/Chat"));
const ChatSection = lazy(
  () => import("../features/chat/components/ChatSection")
);

const Posts = lazy(() => import("../features/posts/Components/Posts"));
const UserProfile = lazy(
  () => import("../features/user/Components/UserProfile")
);
const PostsByTag = lazy(
  () => import("../features/posts/Components/PostsByTag")
);

const Bookmarks = lazy(
  () => import("../features/posts/Components/BookmarkedPosts")
);
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
    errorElement: <ErrorRouteElement />,
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
        path: "/signup/:email",
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
    errorElement: <ErrorRouteElement />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<ShimmerPosts />}>
            <Posts />
          </Suspense>
        ),
      },
      {
        path: "/chats",
        element: (
          <Suspense fallback={<ShimmerChat />}>
            <Chat />,
          </Suspense>
        ),
        children: [
          {
            path: ":chatId",
            element: (
              <Suspense fallback={<ShimmerChatSection />}>
                <ChatSection />
              </Suspense>
            ),
          },
        ],
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
        element: (
          <Suspense fallback={<ShimmerPosts />}>
            <Posts />
          </Suspense>
        ),
      },
      {
        path: "posts/tags/:tag",
        element: (
          <Suspense fallback={<ShimmerPosts />}>
            <PostsByTag />
          </Suspense>
        ),
      },
      {
        path: "user/:username",
        element: (
          <ErrorBoundary
            FallbackComponent={FallbackErrorBoundary}
            onReset={() => {}}
          >
            <Suspense fallback={<ShimmerProfile />}>
              <UserProfile />
            </Suspense>
          </ErrorBoundary>
        ),
        children: [
          {
            index: true,
            element: <UserProfileAbout />,
          },
          {
            path: "about", // This can be used as well for the about page
            element: <UserProfileAbout />,
          },
          {
            path: "posts",
            element: (
              <Suspense fallback={<ShimmerPosts />}>
                <Posts />
              </Suspense>
            ),
          },
          {
            path: "bookmarks",
            element: (
              <Suspense fallback={<ShimmerPosts />}>
                <Bookmarks />
              </Suspense>
            ),
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "/test",
        element: <TestErrorBoundary />,
      },
    ],
  },
];
