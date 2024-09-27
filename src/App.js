import React from "react";
import { ExpensesProvider } from "./context/ExpensesContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root.tsx";

import Home from "./views/Home/index.tsx";
import NotFound from "./views/NotFound/index.tsx";
import Registry from "./views/Registry/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/registro",
        element: <Registry />,
      },
    ],
  },
]);

function App() {
  return (
    <ExpensesProvider>
      <RouterProvider router={router} />
    </ExpensesProvider>
  );
}

export default App;
