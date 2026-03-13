import React from "react";
import Register from "./pages/Register";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      element: <ProtectedRoute />,
      children:[
        {
          path:"/dashboard",
          element: <Dashboard/>
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
