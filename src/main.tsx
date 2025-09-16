import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "sonner";
import DashboardLayout from "./components/core/dashboardLayout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import User from "./pages/user";
import Users from "./pages/users";
import { store } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        children: [
          {
            index: true,
            element: <Users />,
          },
          {
            path: ":userId",
            element: <User />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster richColors position="top-right" />
    <RouterProvider router={router} />
  </Provider>,
);
