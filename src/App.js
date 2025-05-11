import React from "react";
import { ExpensesProvider } from "./context/ExpensesContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Root from "./routes/Root.tsx";

import Home from "./views/Home/Home.tsx";
import NotFound from "./views/NotFound/index.tsx";
import Registry from "./views/Registry/index.tsx";
import Login from "./views/Login/Login.tsx";
import Create from "./views/Create/Create.tsx";
import Update from "./views/Update/Update.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "fint-desktop/",
        element: <ProtectedRoute element={Home} />,
      },
      {
        path: "fint-desktop/login",
        element: <Login />,
      },
      {
        path: "fint-desktop/create",
        element: <ProtectedRoute element={Create} />,
      },
      {
        path: "fint-desktop/update/:id",
        element: <ProtectedRoute element={Update} />,
      },
      {
        path: "fint-desktop/registro",
        element: <ProtectedRoute element={Registry} />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ExpensesProvider>
        <RouterProvider router={router} />
      </ExpensesProvider>
    </AuthProvider>
  );
}

export default App;
