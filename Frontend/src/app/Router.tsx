import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import React from "react";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: "*",
    lazy: async () => {
      const NotFoundPage = (await import("../pages/NotFoundPage")).default;
      return {
        element: <NotFoundPage />,
      };
    }
  }
]);



const AppRouter: React.FC = () => {
    return <RouterProvider router={router}/>
}

export default AppRouter;
