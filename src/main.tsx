import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from "./pages/dashboard";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Posts from "./pages/posts";
import Users from "./pages/users";
import DashboardLayout from "./components/core/dashboardLayout";
import Login from "./pages/login";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/posts",
    element: (
      <DashboardLayout>
        <Posts />
      </DashboardLayout>
    ),
  },
  {
    path: "/users",
    element: (
      <DashboardLayout>
        <Users />
      </DashboardLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster richColors position="top-right" />
    <RouterProvider router={router} />
  </Provider>,
);
