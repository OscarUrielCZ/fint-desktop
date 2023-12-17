import React from "react";
// import { ExpensesProvider } from "./context/ExpensesContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import AppUI from "./AppUI";

import Root from "./routes/Root";

import Budget from "./views/Budget/index";
import Home from "./views/Home/index";
import NotFound from "./views/NotFound/index";
import Registry from "./views/Registry/index";
import Settings from "./views/Settings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/presupuesto",
                element: <Budget />
            },
            {
                path: "/registro",
                element: <Registry />
            },
            {
                path: "/configuracion",
                element: <Settings />
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

// <ExpensesProvider>
// <AppUI />
// </ExpensesProvider>

export default App;
