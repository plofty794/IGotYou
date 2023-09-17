import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Hero from "./pages/Hero";
import RootLayout from "./RootLayout";
import Login from "./pages/Login";
import { Toaster } from "./components/ui/toaster";
import { useUserStore } from "./store/userStore";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import About from "./pages/About";
import { useAccessTokenStore } from "./store/accessTokenStore";

function App() {
  const user = useUserStore((state) => state.user);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  console.log(user);
  console.log(accessToken);
  return (
    <>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route
              path="/get-started"
              element={user ? <Navigate replace to={"/"} /> : <Hero />}
            />
            <Route path="/about-us" element={<About />} />
          </Route>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate replace to={"/get-started"} />}
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate replace to={`/users/show/${user.id}`} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path={"/users/show/:id"}
            element={user ? <Profile /> : <Navigate replace to={"/login"} />}
          />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
