import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from "./pages/dashboard";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Posts from "./pages/posts";
import Tasks from "./pages/tasks";
import DashboardLayout from "./components/core/dashboardLayout";
import Login from "./pages/login";

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
    path: "/tasks",
    element: (
      <DashboardLayout>
        <Tasks />
      </DashboardLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
