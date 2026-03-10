import React from "react";
import Register from "./pages/Register";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
