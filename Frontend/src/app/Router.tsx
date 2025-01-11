import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/Public/HomePage";
import React from "react";
import AboutPage from "../pages/Public/AboutPage";
import Main from "@/Layout/Main";
import {
  AllPostsPage,
  CreatePostPage,
  ProfilePage,
  ReadPostPage,
} from "@/pages";
import ProfileOverview from "@/features/Profile/components/ProfileOverview";
import DraftLayout from "@/features/Blog/Layout/DraftLayout";
import AuthProvider from "@/features/auth/components/AuthProvider";

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
        path: "/profile/@username",
        element: (
          <AuthProvider>
            {" "}
            <ProfilePage />{" "}
          </AuthProvider>
        ),
        children: [
          {
            path: "posts",
            element: <ProfileOverview />,
          },
          {
            path: "personal-information",
            element: <ProfileOverview />,
          },
        ],
      },
    ],
  },

  {
    path: "/draft",
    element: (
      <AuthProvider>
        {" "}
        <DraftLayout />{" "}
      </AuthProvider>
    ),
    children: [
      {
        path: ":draftId",
        element: <CreatePostPage />,
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
    path: "/edit/:id",
    lazy: async () => {
      const { EditPostPage } = await import("@/pages");
      return {
        element: <EditPostPage />,
      };
    },
  },
  {
    path: "preview/:id",
    lazy: async () => {
      const { PreviewPostPage } = await import("@/pages");
      return {
        element: <PreviewPostPage />,
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

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
