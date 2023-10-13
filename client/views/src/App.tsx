import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import Hero from "./pages/Hero";
import RootLayout from "./root layouts/RootLayout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import About from "./pages/About";
import { auth } from "./firebase config/config";
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import VerifyPhone from "./pages/PhoneVerify";
import { verifyPhoneLoader } from "./constants/loaders/verifyPhoneLoader";
import HeroLayout from "./root layouts/HeroLayout";
import CategoryOne from "./pages/categories/CategoryOne";
import CategoryTwo from "./pages/categories/CategoryTwo";
import CategoryThree from "./pages/categories/CategoryThree";
import CategoryFour from "./pages/categories/CategoryFour";
import BecomeAHostOverview from "./pages/become a host/BecomeAHostOverview";
import BecomeAHostLayout from "./root layouts/BecomeAHostLayout";
import AboutYourService from "./pages/become a host/steps/AboutYourService";
import Service from "./pages/become a host/Service";
import ServiceDescription from "./pages/become a host/ServiceDescription";
import MakeItStandOut from "./pages/become a host/steps/MakeItStandOut";
import Photos from "./pages/become a host/steps/Photos";

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
        {/* HERO Routes */}
        <Route element={<HeroLayout />}>
          <Route path="get-started" element={<Hero />} />
          <Route path="about-us" element={<About />} />
        </Route>

        {/* USER PROFILE & PHONE VERIFICATION Routes */}
        <Route path="/">
          <Route
            path="users/show/:id"
            element={
              User ?? item ? <Profile /> : <Navigate replace to={"/login"} />
            }
          />
          <Route
            path="account/verify-phone"
            loader={verifyPhoneLoader}
            element={
              User ?? item ? (
                <VerifyPhone />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
        </Route>

        {/* HOME & CATEGORIES Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              User ?? item ? <Home /> : <Navigate replace to={"/login"} />
            }
          />
          <Route path="/" element={<CategoryOne />} />
          <Route
            path="category/photography&videography"
            element={<CategoryTwo />}
          />
          <Route
            path="category/audio&sound_services"
            element={<CategoryThree />}
          />
          <Route
            path="category/events&entertainment"
            element={<CategoryFour />}
          />
        </Route>

        {/* BECOME A HOST Routes */}
        <Route path="/become-a-host/:id" element={<BecomeAHostLayout />}>
          <Route path="overview" element={<BecomeAHostOverview />} />
          <Route path="about-your-service" element={<AboutYourService />} />
          <Route path="service" element={<Service />} />
          <Route path="service-description" element={<ServiceDescription />} />
          <Route path="make-it-standout" element={<MakeItStandOut />} />
          <Route path="photos" element={<Photos />} />
        </Route>

        {/* LOGIN & 404 Routes */}
        <Route>
          <Route
            path="login"
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
