import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import Hero from "./pages/Hero";
import RootLayout from "./RootLayout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import About from "./pages/About";
import { auth } from "./firebase config/config";
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import VerifyPhone from "./pages/PhoneVerify";

function App() {
  const item = localStorage.getItem("ID");
  const [User, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) return setUser(null);
      user && setUser(user);
    });
  }, [User, item]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RootLayout />}>
          <Route path="/get-started" element={<Hero />} />
          <Route path="/about-us" element={<About />} />
        </Route>
        <Route>
          <Route
            path="/"
            element={
              User ?? item ? <Home /> : <Navigate replace to={"/login"} />
            }
          />
          <Route
            path="/users/show/:id"
            element={
              User ?? item ? <Profile /> : <Navigate replace to={"/login"} />
            }
          />
          <Route
            path="/account/verify-phone"
            element={
              User ?? item ? (
                <VerifyPhone />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
        </Route>
        <Route>
          <Route
            path="/login"
            element={User ?? item ? <Navigate replace to={"/"} /> : <Login />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
