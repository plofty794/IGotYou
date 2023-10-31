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
import Price from "./pages/become a host/Price";
import Success from "./pages/become a host/steps/Success";
import VisitProfile from "./pages/VisitProfile";
import ProfileLayout from "./root layouts/ProfileLayout";
import SubscriptionLayout from "./root layouts/SubscriptionLayout";
import SubscriptionWelcome from "./pages/subscription/SubscriptionWelcome";
import SubscriptionPayment from "./pages/subscription/SubscriptionPayment";
import ConfirmPayment from "./pages/subscription/ConfirmPayment";
import PaymentSuccessful from "./pages/subscription/PaymentSuccess";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const token = localStorage.getItem("token");
  const [User, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) return setUser(null);
      user && setUser({ ...user });
    });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* HERO Routes */}
        <Route element={<HeroLayout />}>
          <Route path="get-started" element={<Hero />} />
          <Route path="about-us" element={<About />} />
        </Route>

        {/* USER PROFILE & PHONE VERIFICATION Routes */}
        <Route path="/users" element={<ProfileLayout />}>
          <Route
            path="show/:id"
            element={
              User ?? token ? <Profile /> : <Navigate replace to={"/login"} />
            }
          />
          <Route
            path="visit/show/:id"
            element={
              User ?? token ? (
                <VisitProfile />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
        </Route>

        <Route
          path="account/verify-phone/:id"
          loader={verifyPhoneLoader}
          element={
            User ?? token ? <VerifyPhone /> : <Navigate replace to={"/login"} />
          }
        />

        {/* HOME & CATEGORIES Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              User ?? token ? <Home /> : <Navigate replace to={"/login"} />
            }
          />
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
        <Route
          path="/become-a-host/:id"
          element={
            User ?? token ? (
              <BecomeAHostLayout />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        >
          <Route
            path="overview"
            element={
              User ?? token ? (
                <BecomeAHostOverview />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="about-your-service"
            element={
              User ?? token ? (
                <AboutYourService />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="service"
            element={
              User ?? token ? <Service /> : <Navigate to={"/login"} replace />
            }
          />
          <Route
            path="service-description"
            element={
              User ?? token ? (
                <ServiceDescription />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="make-it-standout"
            element={
              User ?? token ? (
                <MakeItStandOut />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="photos"
            element={
              User ?? token ? <Photos /> : <Navigate to={"/login"} replace />
            }
          />
          <Route
            path="price"
            element={
              User ?? token ? <Price /> : <Navigate to={"/login"} replace />
            }
          />
          <Route
            path="success"
            element={
              User ?? token ? <Success /> : <Navigate to={"/login"} replace />
            }
          />
        </Route>

        {/* MAKE SUBSCRIPTION PAYMENT Routes */}
        <Route path="/subscription/:id" element={<SubscriptionLayout />}>
          <Route path="welcome" element={<SubscriptionWelcome />} />
          <Route path="send-payment" element={<SubscriptionPayment />} />
          <Route path="confirm-payment" element={<ConfirmPayment />} />
          <Route path="payment-success" element={<PaymentSuccessful />} />
        </Route>

        {/* LOGIN & PASSWORD RESET & 404 Routes */}
        <Route>
          <Route
            path="login"
            element={User ?? token ? <Navigate replace to={"/"} /> : <Login />}
          />
          <Route
            path="forgot-password"
            element={
              User ?? token ? <Navigate replace to={"/"} /> : <ForgotPassword />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
