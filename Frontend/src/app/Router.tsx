import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import React from "react";
import AboutPage from "../pages/AboutPage";

const router = createBrowserRouter([
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
      const ProfilePage = (await import("@/pages/ProfileManagement/ProfilePage"))
        .default;
      return {
        element: <ProfilePage />,
      };
    },
    children: [
      // {
      //   path: "/setting",
      //   lazy: async () => {
      //     const SettingPage = (await import("@/pages/ProfileManagement/SettingPage"))
      //       .default;
      //     return {
      //       element: <SettingPage />,
      //     };
      //   }
      // }
    ]
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
      const ResetPasswordPage = (await import("@/pages/Auth/ResetPasswordPage"))
        .default;
      return {
        element: <ResetPasswordPage />,
      };
    }
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
      const NotFoundPage = (await import("../pages/NotFoundPage")).default;
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
