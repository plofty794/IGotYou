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
import { lazy, Suspense, useContext, useEffect, useState } from "react";
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
import WriteAFeedback from "../pages/WriteAFeedback";
import AccountDisabled from "../pages/AccountDisabled";
import useLogOutUser from "@/hooks/useLogout";
import { onAuthStateChanged, User } from "firebase/auth";
import { UserStateContextProvider } from "@/context/UserStateContext";
import { auth } from "@/firebase config/config";
import { SocketContextProvider } from "@/context/SocketContext";
import ListingsLoader from "@/partials/loaders/ListingsLoader";
import SubscriptionExpired from "@/pages/SubscriptionExpired";
import HostEarnings from "@/pages/HostEarnings";
import HostReviewsLayout from "@/root layouts/HostReviewsLayout";
import HostReviews from "@/pages/HostReviews";
import GuestReviews from "@/pages/GuestReviews";

function Router() {
  const { mutate } = useLogOutUser();
  const [User, setUser] = useState<User | null>();
  const { socket } = useContext(SocketContextProvider);
  const identifier = localStorage.getItem("token");
  const {
    state: { token },
  } = useContext(UserStateContextProvider);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (
        !user &&
        !window.location.pathname.includes("get-started") &&
        !window.location.pathname.includes("about-us") &&
        !window.location.pathname.includes("account-disabled")
      ) {
        if (window.location.pathname == "/login") {
          return setUser(null);
        } else {
          mutate();
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
  }, [mutate, socket]);

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
            path="visit/show/:userID"
            element={
              User ?? token ?? identifier ? (
                <VisitProfile />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />

          <Route
            path="identity-verification/:id"
            element={
              User ?? token ?? identifier ? (
                <IdentityVerification />
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
        <Route
          errorElement={<RootLayoutErrorBoundary />}
          element={<RootLayout />}
        >
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
            path="/digital-video-services"
            element={
              User ?? token ?? identifier ? (
                <DigitalVideoServices />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="/digital-audio-services"
            element={
              User ?? token ?? identifier ? (
                <DigitalAudioServices />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="/graphic-design&visual-arts"
            element={
              User ?? token ?? identifier ? (
                <GraphicDesignAndVisualArts />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="/photography-services"
            element={
              User ?? token ?? identifier ? (
                <PhotographyServices />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="/animation&3d-modeling"
            element={
              User ?? token ?? identifier ? (
                <AnimationAnd3DModeling />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="/live-events&concerts"
            element={
              User ?? token ?? identifier ? (
                <LiveEventsAndConcerts />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="/digital-advertising&marketing"
            element={
              User ?? token ?? identifier ? (
                <DigitalAdvertisingAndMarketing />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
        </Route>

        {/* BECOME A HOST Routes */}
        <Route
          errorElement={<RootLayoutErrorBoundary />}
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
            path="service-type"
            element={
              User ?? token ?? identifier ? (
                <ServiceType />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="service-title"
            element={
              User ?? token ?? identifier ? (
                <ServiceTitle />
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
            path="service-assets"
            element={
              User ?? token ?? identifier ? (
                <ServiceAssets />
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
            path="cancellation-policy"
            element={
              User ?? token ?? identifier ? (
                <CancellationPolicy />
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

        {/* BOOKING Route */}
        <Route path="/listings" element={<ListingsLayout />}>
          <Route
            path="show/:listingID"
            element={
              User ?? token ?? identifier ? (
                <VisitListing />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
          <Route
            path="create-booking/:listingID"
            element={
              User ?? token ?? identifier ? (
                <MakeABooking />
              ) : (
                <Navigate to={"/login"} replace />
              )
            }
          />
        </Route>

        {/* MESSAGES Route */}
        <Route
          path="/messages"
          element={
            User ?? token ?? identifier ? (
              <MessagesLayout />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        >
          <Route
            path="conversation/:conversationID"
            element={
              User ?? token ?? identifier ? (
                <Messages />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
        </Route>

        {/* RESERVATION Route */}
        <Route
          path="/reservation-details/:reservationID"
          element={
            User ?? token ?? identifier ? (
              <ReservationDetails />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        />
        <Route
          path="/reservation-details/:reservationID/payment-details"
          element={
            User ?? token ?? identifier ? (
              <PaymentDetails />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        />

        {/* BOOKINGS Route */}
        <Route
          path="/bookings"
          element={
            User ?? token ?? identifier ? (
              <BookingsLayout />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        >
          <Route
            path="all"
            element={
              User ?? token ?? identifier ? (
                <AllBookingRequests />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="approved"
            element={
              User ?? token ?? identifier ? (
                <ApprovedBookingRequests />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="pending"
            element={
              User ?? token ?? identifier ? (
                <PendingBookingRequests />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="declined"
            element={
              User ?? token ?? identifier ? (
                <DeclinedBookingRequests />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="cancelled"
            element={
              User ?? token ?? identifier ? (
                <CancelledBookingRequests />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
        </Route>

        {/* HOSTING Route */}
        <Route
          errorElement={<RootLayoutErrorBoundary />}
          element={<HostingLayout />}
        >
          <Route
            path="hosting"
            element={
              User ?? token ?? identifier ? (
                <Hosting />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          >
            <Route
              path="current-reservations"
              element={
                User ?? token ?? identifier ? (
                  <CurrentReservations />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
            <Route
              path="upcoming-reservations"
              element={
                User ?? token ?? identifier ? (
                  <UpcomingReservations />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
            <Route
              path="previous-reservations"
              element={
                User ?? token ?? identifier ? (
                  <PreviousReservations />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
          </Route>
          <Route
            path="hosting-calendar"
            element={
              User ?? token ?? identifier ? (
                <HostCalendar />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="hosting-reservations"
            element={
              User ?? token ?? identifier ? (
                <Reservations />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          >
            <Route
              path="all"
              element={
                User ?? token ?? identifier ? (
                  <AllReservationsTab />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
            <Route
              path="upcoming"
              element={
                User ?? token ?? identifier ? (
                  <UpcomingReservationsTab />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
            <Route
              path="previous"
              element={
                User ?? token ?? identifier ? (
                  <PreviousReservationsTab />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
          </Route>
          <Route
            path="hosting-inbox"
            element={
              User ?? token ?? identifier ? (
                <Inbox />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          >
            <Route
              path="booking-request/:id"
              element={
                User ?? token ?? identifier ? (
                  <BookingRequest />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
          </Route>
          <Route
            path="hosting-listings"
            element={
              User ?? token ?? identifier ? (
                <Listings />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          >
            <Route
              path="edit/:listingID"
              element={
                User ?? token ?? identifier ? (
                  <EditListing />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
          </Route>
          <Route
            path="hosting"
            element={
              User ?? token ?? identifier ? (
                <Hosting />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="hosting-subscription"
            element={
              User ?? token ?? identifier ? (
                <Subscription />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="hosting-reviews/:userID"
            element={
              User ?? token ?? identifier ? (
                <HostReviewsLayout />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          >
            <Route
              path="host"
              element={
                User ?? token ?? identifier ? (
                  <HostReviews />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
            <Route
              path="guest"
              element={
                User ?? token ?? identifier ? (
                  <GuestReviews />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
          </Route>
          <Route
            path="hosting-earnings"
            element={
              User ?? token ?? identifier ? (
                <HostEarnings />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
        </Route>

        {/* MAKE SUBSCRIPTION PAYMENT Routes */}
        <Route
          path="/subscription/:id"
          element={
            User ?? token ?? identifier ? (
              <SubscriptionLayout />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        >
          <Route
            path="welcome"
            element={
              User ?? token ?? identifier ? (
                <SubscriptionWelcome />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="send-payment"
            element={
              User ?? token ?? identifier ? (
                <SubscriptionPayment />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="confirm-payment"
            element={
              User ?? token ?? identifier ? (
                <ConfirmPayment />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="payment-success"
            element={
              User ?? token ?? identifier ? (
                <PaymentSuccessful />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
        </Route>

        <Route
          path="/subscription/:id/expired"
          element={
            User ?? token ?? identifier ? (
              <SubscriptionExpired />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        />

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
