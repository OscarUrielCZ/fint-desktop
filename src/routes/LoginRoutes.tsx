import React, { lazy } from "react";

// import Login from "../views/Login/index.tsx";

const Login = lazy(() => import("../views/Login/index.tsx"));

const LoginRoutes = {
  path: "/",
  element: <div>Bienvenidos a FINT</div>,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
  ],
};

export default LoginRoutes;
