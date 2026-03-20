import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/HomePage/Home";
import Dashboard from "./ProtectedRoutes/Dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import AuthRoute from "./ProtectedRoutes/AuthRoute";
import MainLayout from "./Layout/MainLayout";
import Transaction from "./ProtectedRoutes/Transaction/Transaction";
import RoleRoute from "./ProtectedRoutes/Transaction/RoleRoute";
import CreateInitialFunds from "./ProtectedRoutes/Transaction/createInitialFunds";
import AllTransactions from "./ProtectedRoutes/Transaction/TransactionHistory/AllTransactions";
import MoreOptions from "./ProtectedRoutes/MoreOptions";
import ErrorPage from "./pages/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
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
          {
            path: "/transactions",
            element: <AllTransactions />,
          },
          {
            path: "/moreoptions",
            element: <MoreOptions />,
          },
          {
            element: <RoleRoute />,
            children: [
              {
                path: "/initial-funds",
                element: <CreateInitialFunds />,
              },
            ],
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
