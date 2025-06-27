import { ExpensesProvider } from "./context/ExpensesContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Root from "./routes/Root.tsx";

import CategoryView from "./views/Category/CategoryView.tsx";
import HomeView from "./views/Home/HomeView.tsx";
import NotFoundView from "./views/NotFound/NotFoundView.tsx";
import LoginView from "./views/Login/LoginView.tsx";
import CreateView from "./views/Create/CreateView.tsx";
import UpdateView from "./views/Update/UpdateView.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";

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
        <RouterProvider router={router} />
      </ExpensesProvider>
    </AuthProvider>
  );
}

export default App;
