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

function App() {
  const isAdmin = localStorage.getItem("isAdmin");
  const { state } = useContext(UserStateContextProvider);

  console.log(isAdmin, state);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
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
