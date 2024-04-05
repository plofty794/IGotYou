import Login from "./pages/Login";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./root layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { UserStateContextProvider } from "./context/UserStateContext";
import Users from "./pages/Users";
import Subscriptions from "./pages/Subscriptions";
import AllSubscriptions from "./pages/AllSubscriptions";
import IdentityPhotos from "./pages/IdentityPhotos";
import Reports from "./pages/Reports";
import Payments from "./pages/Payments";
import Refunds from "./pages/Refunds";
import AllIdentityVerificationRequests from "./pages/AllIdentityVerificationRequests";
import AllServicePayments from "./pages/AllServicePayments";

function App() {
  const isAdmin = localStorage.getItem("isAdmin");
  const { state } = useContext(UserStateContextProvider);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* ADMIN DASHBOARD Routes */}
        <Route element={<RootLayout />}>
          <Route index path="/" element={<Navigate to={"/dashboard"} />} />
          <Route
            path="dashboard"
            element={
              state.state ?? isAdmin ? (
                <Dashboard />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="payments"
            element={
              state.state ?? isAdmin ? (
                <Payments />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="users"
            element={
              state.state ?? isAdmin ? (
                <Users />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="subscriptions"
            element={
              state.state ?? isAdmin ? (
                <Subscriptions />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="reports"
            element={
              state.state ?? isAdmin ? (
                <Reports />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="identity-photos"
            element={
              state.state ?? isAdmin ? (
                <IdentityPhotos />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="refunds"
            element={
              state.state ?? isAdmin ? (
                <Refunds />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
        </Route>

        <Route
          path="/all-subscriptions"
          element={
            state.state ?? isAdmin ? (
              <AllSubscriptions />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />

        <Route
          path="all-service-payments"
          element={
            state.state ?? isAdmin ? (
              <AllServicePayments />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />

        <Route
          path="/identity-photos/all"
          element={
            state.state ?? isAdmin ? (
              <AllIdentityVerificationRequests />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        />

        {/* ADMIN LOGIN Route */}
        <Route>
          <Route
            path="login"
            element={
              state.state ?? isAdmin ? (
                <Navigate to={"/dashboard"} replace />
              ) : (
                <Login />
              )
            }
          />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
