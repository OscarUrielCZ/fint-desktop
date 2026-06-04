import React, { lazy, Suspense } from "react";
import { ExpensesProvider } from "./context/ExpensesContext";

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
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ExpensesProvider>
    </AuthProvider>
  );
}

export default App;
