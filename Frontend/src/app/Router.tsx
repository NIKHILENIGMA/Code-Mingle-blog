import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/Public/HomePage";
import React from "react";
import AboutPage from "../pages/Public/AboutPage";
import Main from "@/Layout/Main";
import { AllPostsPage, CreatePostPage, ReadPostPage } from "@/pages";
import DraftLayout from "@/features/Blog/Layout/DraftLayout";
// import AuthProvider from "@/features/auth/components/AuthProvider";
import PreviewPostPage from "@/pages/Blog/PreviewPostPage";
import PrivateRoute from "@/components/PrivateRoute";
import ProfileSettings from "@/features/Profile/pages/ProfileSetting";
import PersonalSettings from "@/features/Profile/pages/PersonalSettings";
import ProfileSecurity from "@/features/Profile/pages/ProfileSecurity";
import AccountSettings from "@/features/Profile/pages/AccountSettings";
import GeneralDetails from "@/features/Profile/pages/GeneralDetails";
import UserDashboard from "@/features/Profile/pages/UserDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/posts",
        element: <AllPostsPage />,
      },
      {
        path: "/posts/:postId",
        element: <ReadPostPage />,
      },
      {
        path: "/profile/me",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
        children: [],
      },
      {
        path: "/profile/settings",
        element: (
          // <PrivateRoute>
            <ProfileSettings />
          // </PrivateRoute>
        ),
        children: [
          {
            path: "general-details",
            element: <GeneralDetails />
          },
          {
            path: "personal-settings",
            element: <PersonalSettings />
          },
          {
            path: "security",
            element: <ProfileSecurity />
          },
          {
            path: "account",
            element: <AccountSettings />
          },
        ]
      },
    ],
  },

  {
    path: "/draft",
    element: (
      <PrivateRoute>
        {" "}
        <DraftLayout />{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: ":draftId",
        element: <CreatePostPage />,
      },
      {
        path: ":draftId/preview",
        element: <PreviewPostPage />,
      },
    ],
  },
  {
    path: "/learn",
    lazy: async () => {
      const { LearnEditorPage } = await import("@/pages");
      return {
        element: <LearnEditorPage />,
      };
    },
  },

  {
    path: "/login",
    lazy: async () => {
      const LoginPage = (await import("@/pages/Auth/LoginPage")).default;
      return {
        element: <LoginPage />,
      };
    },
  },
  {
    path: "/forgot-password",
    lazy: async () => {
      const ResetPasswordPage = (
        await import("@/pages/Auth/ForgotPasswordPage")
      ).default;
      return {
        element: <ResetPasswordPage />,
      };
    },
  },
  {
    path: "/reset-password",
    lazy: async () => {
      const ResetPasswordPage = (await import("@/pages/Auth/ResetPasswordPage"))
        .default;
      return {
        element: <ResetPasswordPage />,
      };
    },
  },
  {
    path: "/signup",
    lazy: async () => {
      const SignupPage = (await import("@/pages/Auth/SignupPage")).default;
      return {
        element: <SignupPage />,
      };
    },
  },

  {
    path: "*",
    lazy: async () => {
      const NotFoundPage = (await import("../pages/Public/NotFoundPage"))
        .default;
      return {
        element: <NotFoundPage />,
      };
    },
  },
]);

/**
 * AppRouter
 * @description - This component is responsible for rendering the router provider
 * @returns - RouterProvider
 */
const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
