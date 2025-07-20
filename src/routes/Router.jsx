import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../router/PrivateRoute";
import ParcelForm from "../components/ParcelForm";
import DashBoradLayout from "../layouts/DashBoradLayout";
import MyParcels from "../pages/DashBoard/MyParcels/MyParcels";
import Payment from "../pages/DashBoard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
      {
        path: "/parcelForm",
        element: (
          <PrivateRoute>
            <ParcelForm></ParcelForm>
          </PrivateRoute>
        ),
      },
    ],
  },
  // Auth Layouts
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  // Dash Board
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoradLayout></DashBoradLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
    ],
  },
]);
