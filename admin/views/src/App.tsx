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
import VerifiedPayments from "./pages/VerifiedPayments";
import IdentityPhotos from "./pages/IdentityPhotos";

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
            path="identity-photos"
            element={
              state.state ?? isAdmin ? (
                <IdentityPhotos />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
        </Route>

        <Route>
          <Route
            path="/verified-payments"
            element={
              state.state ?? isAdmin ? (
                <VerifiedPayments />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
        </Route>

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
