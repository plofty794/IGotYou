import "swiper/swiper-bundle.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import RootLayout from "../root layouts/RootLayout";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import PageNotFound from "../pages/PageNotFound";
import { lazy, useContext, useEffect, useState } from "react";
import { verifyPhoneLoader } from "../constants/loaders/verifyPhoneLoader";
import HeroLayout from "../root layouts/HeroLayout";
import DigitalVideoServices from "../pages/categories/DigitalVideoServices";
import GraphicDesignAndVisualArts from "../pages/categories/GraphicDesignAndVisualArts";
import BecomeAHostOverview from "../pages/become a host/BecomeAHostOverview";
import BecomeAHostLayout from "../root layouts/BecomeAHostLayout";
import AboutYourService from "../pages/become a host/steps/AboutYourService";
import ServiceType from "../pages/become a host/ServiceType";
import MakeItStandOut from "../pages/become a host/steps/MakeItStandOut";
import Price from "../pages/become a host/Price";
import Success from "../pages/become a host/steps/Success";
import VisitProfile from "../pages/VisitProfile";
import ProfileLayout from "../root layouts/ProfileLayout";
import SubscriptionLayout from "../root layouts/SubscriptionLayout";
import SubscriptionWelcome from "../pages/subscription/SubscriptionWelcome";
import SubscriptionPayment from "../pages/subscription/SubscriptionPayment";
import ConfirmPayment from "../pages/subscription/ConfirmPayment";
import PaymentSuccessful from "../pages/subscription/PaymentSuccess";
import ForgotPassword from "../pages/ForgotPassword";

import ListingDate from "../pages/become a host/ListingDate";

import Hosting from "../pages/Hosting";
import HostingLayout from "../root layouts/HostingLayout";
import VisitListing from "../pages/VisitListing";
import ServiceLocation from "../pages/become a host/ServiceLocation";

const About = lazy(() => import("../pages/About"));
const Hero = lazy(() => import("../pages/Hero"));
const VerifyPhone = lazy(() => import("../pages/PhoneVerify"));
const Home = lazy(() => import("../pages/Home"));
const Wishlists = lazy(() => import("../pages/Wishlists"));
const Inbox = lazy(() => import("../pages/Inbox"));
const Messages = lazy(() => import("../pages/Messages"));
const RootLayoutErrorBoundary = lazy(
  () => import("../partials/components/RootLayoutErrorBoundary"),
);
const PageUnavailable = lazy(() => import("../pages/PageUnavailable"));

import ListingsLayout from "../root layouts/ListingsLayout";
import MakeABooking from "../pages/MakeABooking";
import BookingsLayout from "../root layouts/BookingsLayout";
import DigitalAudioServices from "../pages/categories/DigitalAudioServices";
import PhotographyServices from "../pages/categories/PhotographyServices";
import AnimationAnd3DModeling from "../pages/categories/AnimationAnd3DModeling";
import LiveEventsAndConcerts from "../pages/categories/LiveEventsAndConcerts";
import DigitalAdvertisingAndMarketing from "../pages/categories/DigitalAdvertisingAndMarketing";
import MessagesLayout from "../root layouts/MessagesLayout";
import IdentityVerification from "../pages/IdentityVerification";
import ServiceAssets from "../pages/become a host/steps/ServiceAssets";
import CurrentReservations from "../partials/components/hosting/reservations/CurrentReservations";
import UpcomingReservations from "../partials/components/hosting/reservations/UpcomingReservations";
import PreviousReservations from "../partials/components/hosting/reservations/PreviousReservations";
import CancellationPolicy from "../pages/become a host/CancellationPolicy";
import Listings from "../pages/Listings";
import EditListing from "../pages/host/listings/EditListing";
import AllBookingRequests from "../pages/bookings/AllBookingRequests";
import ApprovedBookingRequests from "../pages/bookings/ApprovedBookingRequests";
import PendingBookingRequests from "../pages/bookings/PendingBookingRequests";
import DeclinedBookingRequests from "../pages/bookings/DeclinedBookingRequests";
import CancelledBookingRequests from "../pages/bookings/CancelledBookingRequests";
import BookingRequest from "../pages/inbox/BookingRequest";
import ServiceTitle from "../pages/become a host/ServiceTitle";
import HostCalendar from "../pages/HostCalendar";
import Reservations from "../pages/Reservations";
import AllReservationsTab from "../partials/components/hosting/reservations page/AllReservationsTab";
import UpcomingReservationsTab from "../partials/components/hosting/reservations page/UpcomingReservationsTab";
import PreviousReservationsTab from "../partials/components/hosting/reservations page/PreviousReservationsTab";
import ReservationDetails from "../pages/ReservationDetails";
import PaymentDetails from "../pages/PaymentDetails";
import Subscription from "../pages/Subscription";
import HostReviews from "../pages/HostReviews";
import WriteAFeedback from "../pages/WriteAFeedback";
import AccountDisabled from "../pages/AccountDisabled";
import useLogOutUser from "@/hooks/useLogout";
import { onAuthStateChanged, User } from "firebase/auth";
import { UserStateContextProvider } from "@/context/UserStateContext";
import { auth } from "@/firebase config/config";
import { SocketContextProvider } from "@/context/SocketContext";

function Router() {
  const logOut = useLogOutUser();
  const [User, setUser] = useState<User | null>();
  const { socket } = useContext(SocketContextProvider);
  const identifier = localStorage.getItem("token");
  const {
    state: { token },
  } = useContext(UserStateContextProvider);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (
        !user &&
        !window.location.pathname.includes("get-started") &&
        !window.location.pathname.includes("about-us") &&
        !window.location.pathname.includes("account-disabled")
      ) {
        if (window.location.pathname == "/login") {
          return setUser(null);
        } else {
          localStorage.clear();
          await logOut();
          window.location.href = "/login";
          return setUser(null);
        }
      } else {
        setUser(user);
        socket?.emit("user-connect", {
          name: user?.displayName,
          uid: user?.uid,
        });
      }
    });
  }, [logOut, socket]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* HERO Routes */}
        <Route element={<HeroLayout />}>
          <Route path="get-started" element={<Hero />} />
          <Route path="about-us" element={<About />} />
        </Route>

        <Route path="/account-disabled" element={<AccountDisabled />} />

        {/* WRITE A FEEDBACK Route */}
        <Route path="/write-a-feedback" element={<WriteAFeedback />} />

        {/* USER PROFILE & PHONE VERIFICATION Routes */}
        <Route path="/users" element={<ProfileLayout />}>
          <Route path="wishlists" element={<Wishlists />} />
          <Route path="show/:id" element={<Profile />} />

          <Route path="visit/show/:userID" element={<VisitProfile />} />

          <Route
            path="identity-verification/:id"
            element={<IdentityVerification />}
          />
        </Route>

        <Route
          path="account/verify-phone/:id"
          loader={verifyPhoneLoader}
          element={<VerifyPhone />}
        />

        {/* HOME & CATEGORIES Routes */}
        <Route
          errorElement={<RootLayoutErrorBoundary />}
          element={<RootLayout />}
        >
          <Route index element={<Home />} />
          <Route
            path="/digital-video-services"
            element={<DigitalVideoServices />}
          />
          <Route
            path="/digital-audio-services"
            element={<DigitalAudioServices />}
          />
          <Route
            path="/graphic-design&visual-arts"
            element={<GraphicDesignAndVisualArts />}
          />
          <Route
            path="/photography-services"
            element={<PhotographyServices />}
          />
          <Route
            path="/animation&3d-modeling"
            element={<AnimationAnd3DModeling />}
          />
          <Route
            path="/live-events&concerts"
            element={<LiveEventsAndConcerts />}
          />
          <Route
            path="/digital-advertising&marketing"
            element={<DigitalAdvertisingAndMarketing />}
          />
        </Route>

        {/* BECOME A HOST Routes */}
        <Route
          errorElement={<RootLayoutErrorBoundary />}
          path="/become-a-host/:id"
          element={<BecomeAHostLayout />}
        >
          <Route path="overview" element={<BecomeAHostOverview />} />
          <Route path="about-your-service" element={<AboutYourService />} />
          <Route path="service-type" element={<ServiceType />} />
          <Route path="service-title" element={<ServiceTitle />} />
          <Route path="service-location" element={<ServiceLocation />} />
          <Route path="make-it-standout" element={<MakeItStandOut />} />
          <Route path="service-assets" element={<ServiceAssets />} />
          <Route path="price" element={<Price />} />
          <Route path="listing-date" element={<ListingDate />} />
          <Route path="cancellation-policy" element={<CancellationPolicy />} />
          <Route path="success" element={<Success />} />
        </Route>

        {/* BOOKING Route */}
        <Route path="/listings" element={<ListingsLayout />}>
          <Route path="show/:listingID" element={<VisitListing />} />
          <Route path="create-booking/:listingID" element={<MakeABooking />} />
        </Route>

        {/* MESSAGES Route */}
        <Route path="/messages" element={<MessagesLayout />}>
          <Route path="conversation/:conversationID" element={<Messages />} />
        </Route>

        {/* RESERVATION Route */}
        <Route
          path="/reservation-details/:reservationID"
          element={<ReservationDetails />}
        />
        <Route
          path="/reservation-details/:reservationID/payment-details"
          element={<PaymentDetails />}
        />

        {/* BOOKINGS Route */}
        <Route path="/bookings" element={<BookingsLayout />}>
          <Route path="all" element={<AllBookingRequests />} />
          <Route path="approved" element={<ApprovedBookingRequests />} />
          <Route path="pending" element={<PendingBookingRequests />} />
          <Route path="declined" element={<DeclinedBookingRequests />} />
          <Route path="cancelled" element={<CancelledBookingRequests />} />
        </Route>

        {/* HOSTING Route */}
        <Route
          errorElement={<RootLayoutErrorBoundary />}
          element={<HostingLayout />}
        >
          <Route path="hosting" element={<Hosting />}>
            <Route
              path="current-reservations"
              element={<CurrentReservations />}
            />
            <Route
              path="upcoming-reservations"
              element={<UpcomingReservations />}
            />
            <Route
              path="previous-reservations"
              element={<PreviousReservations />}
            />
          </Route>
          <Route path="hosting-calendar" element={<HostCalendar />} />
          <Route path="hosting-reservations" element={<Reservations />}>
            <Route path="all" element={<AllReservationsTab />} />
            <Route path="upcoming" element={<UpcomingReservationsTab />} />
            <Route path="previous" element={<PreviousReservationsTab />} />
          </Route>
          <Route path="hosting-inbox" element={<Inbox />}>
            <Route path="booking-request/:id" element={<BookingRequest />} />
          </Route>
          <Route path="hosting-listings" element={<Listings />}>
            <Route path="edit/:listingID" element={<EditListing />} />
          </Route>
          <Route path="hosting" element={<Hosting />} />
          <Route path="hosting-subscription" element={<Subscription />} />
          <Route path="hosting-reviews" element={<HostReviews />} />
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

          <Route path="/page-unavailable" element={<PageUnavailable />} />
        </Route>
      </>,
    ),
  );
  return router;
}

export default Router;
