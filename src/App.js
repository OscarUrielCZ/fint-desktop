import React, { lazy, Suspense } from "react";
import { ExpensesProvider } from "./context/ExpensesContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Root from "./routes/Root.tsx";

import ProtectedRoute from "./routes/ProtectedRoute.tsx";

const CategoryView = lazy(() => import("./views/Category/CategoryView.tsx"));
const HomeView = lazy(() => import("./views/Home/HomeView.tsx"));
const NotFoundView = lazy(() => import("./views/NotFound/NotFoundView.tsx"));
const LoginView = lazy(() => import("./views/Login/LoginView.tsx"));
const CreateView = lazy(() => import("./views/Create/CreateView.tsx"));
const UpdateView = lazy(() => import("./views/Update/UpdateView.tsx"));
const DashboardView = lazy(() => import("./views/Dashboard/DashboardView.tsx"));
const IncomeView = lazy(() => import("./views/Income/IncomeView.tsx"));
const InvestmentsView = lazy(() => import("./views/Investments/InvestmentsView.tsx"));
const BudgetView = lazy(() => import("./views/Budget/BudgetView.tsx"));
const CategoryListView = lazy(() => import("./views/Category/CategoryListView.tsx"));

// TODO: update this router to use config/routes.ts
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundView />,
    children: [
      {
        path: "fint-desktop/",
        element: <ProtectedRoute element={HomeView} />,
      },
      {
        path: "fint-desktop/dashboard",
        element: <ProtectedRoute element={DashboardView} />,
      },
      {
        path: "fint-desktop/income",
        element: <ProtectedRoute element={IncomeView} />,
      },
      {
        path: "fint-desktop/investments",
        element: <ProtectedRoute element={InvestmentsView} />,
      },
      {
        path: "fint-desktop/budget",
        element: <ProtectedRoute element={BudgetView} />,
      },
      {
        path: "fint-desktop/categories",
        element: <ProtectedRoute element={CategoryListView} />,
      },
      {
        path: "fint-desktop/login",
        element: <LoginView />,
      },
      {
        path: "fint-desktop/create",
        element: <ProtectedRoute element={CreateView} />,
      },
      {
        path: "fint-desktop/update/:id",
        element: <ProtectedRoute element={UpdateView} />,
      },
      {
        path: "fint-desktop/category/:id",
        element: <ProtectedRoute element={CategoryView} />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ExpensesProvider>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </ThemeProvider>
      </ExpensesProvider>
    </AuthProvider>
  );
}

export default App;
