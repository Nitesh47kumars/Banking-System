import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./ProtectedRoutes/Dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import AuthRoute from "./ProtectedRoutes/AuthRoute";
import MainLayout from "./Layout/MainLayout";
import Transaction from "./ProtectedRoutes/Transaction/Transaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <AuthRoute />,
        children: [
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/transaction",
            element: <Transaction />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
