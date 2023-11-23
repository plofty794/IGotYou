import "swiper/swiper-bundle.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import RootLayout from "./root layouts/RootLayout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import { Suspense, lazy, useContext, useState } from "react";
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
import { UserStateContextProvider } from "./context/UserStateContext";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase config/config";
import ListingDate from "./pages/become a host/ListingDate";
import ListingsLoader from "./partials/loaders/ListingsLoader";
import Hosting from "./pages/Hosting";
import HostingLayout from "./root layouts/HostingLayout";
import VisitListing from "./pages/VisitListing";
import ServiceLocation from "./pages/become a host/ServiceLocation";
const About = lazy(() => import("./pages/About"));
const Hero = lazy(() => import("./pages/Hero"));
const VerifyPhone = lazy(() => import("./pages/PhoneVerify"));
const Home = lazy(() => import("./pages/Home"));
const Wishlists = lazy(() => import("./pages/Wishlists"));
const Inbox = lazy(() => import("./pages/Inbox"));

function App() {
  const [User, setUser] = useState<User | null>();
  const identifier = localStorage.getItem("token");
  const {
    state: { token },
  } = useContext(UserStateContextProvider);

  onAuthStateChanged(auth, (user) => {
    if (!user) return setUser(null);
    setUser(user);
  });

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
          <Route path="wishlists" element={<Wishlists />} />
          <Route
            path="show/:id"
            element={
              User ?? token ?? identifier ? (
                <Profile />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="visit/show/:id"
            element={
              User ?? token ?? identifier ? (
                <VisitProfile />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="listings/:id"
            element={
              User ?? token ?? identifier ? (
                <VisitListing />
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
            User ?? token ?? identifier ? (
              <VerifyPhone />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        />

        {/* HOME & CATEGORIES Routes */}
        <Route element={<RootLayout />}>
          <Route
            index
            element={
              User ?? token ?? identifier ? (
                <Suspense fallback={<ListingsLoader />}>
                  <Home />
                </Suspense>
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="/photography&videography"
            element={
              User ?? token ?? identifier ? (
                <CategoryTwo />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route path="/digital&audio-services" element={<CategoryThree />} />
          <Route
            path="category/events&entertainment"
            element={<CategoryFour />}
          />
        </Route>

        {/* BECOME A HOST Routes */}
        <Route
          path="/become-a-host/:id"
          element={
            User ?? token ?? identifier ? (
              <BecomeAHostLayout />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        >
          <Route
            path="overview"
            element={
              User ?? token ?? identifier ? (
                <BecomeAHostOverview />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="about-your-service"
            element={
              User ?? token ?? identifier ? (
                <AboutYourService />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="service"
            element={
              User ?? token ?? identifier ? (
                <Service />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="service-description"
            element={
              User ?? token ?? identifier ? (
                <ServiceDescription />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="service-location"
            element={
              User ?? token ?? identifier ? (
                <ServiceLocation />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="make-it-standout"
            element={
              User ?? token ?? identifier ? (
                <MakeItStandOut />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="photos"
            element={
              User ?? token ?? identifier ? (
                <Photos />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="price"
            element={
              User ?? token ?? identifier ? (
                <Price />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="listing-date"
            element={
              User ?? token ?? identifier ? (
                <ListingDate />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="success"
            element={
              User ?? token ?? identifier ? (
                <Success />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
        </Route>

        {/* HOSTING Route */}

        <Route path="/" element={<HostingLayout />}>
          <Route path="hosting" element={<Hosting />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="hosting" element={<Hosting />} />
          <Route path="hosting" element={<Hosting />} />
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
            element={
              User ?? token ?? identifier ? (
                <Navigate replace to={"/"} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="forgot-password"
            element={
              User ?? token ?? identifier ? (
                <Navigate replace to={"/"} />
              ) : (
                <ForgotPassword />
              )
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
