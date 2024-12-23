import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/Public/HomePage";
import React from "react";
import AboutPage from "../pages/Public/AboutPage";
import Main from "@/Layout/Main";
// import AuthProvider from "@/features/auth/components/AuthProvider";

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
        path: "/profile",
        lazy: async () => {
          const ProfilePage = (
            await import("@/pages/ProfileManagement/ProfilePage")
          ).default;
          return {
            element: <ProfilePage />,
          };
        },
        children: [],
      },
    ],
  },
  {
    path: "/draft/:id",
    lazy: async () => {
      const { CreatePostPage } = await import("@/pages");
      return {
        element: (
          // <AuthProvider>
          <CreatePostPage />
          // </AuthProvider>
        ),
      };
    },
  },
  {
    path: "/learn-editor-commands",
    lazy: async () => {
      const { LearnEditorPage } = await import("@/pages");
      return {
        element: <LearnEditorPage />,
      };
    },
  },
  {
    path: "/post/read/:id",
    lazy: async () => {
      const { ReadPostPage } = await import("@/pages");
      return {
        element: <ReadPostPage />,
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
