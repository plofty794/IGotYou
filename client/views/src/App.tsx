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
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import About from "./pages/About";
import { auth } from "./firebase config/config";
import { User } from "firebase/auth";
import { useState } from "react";

function App() {
  const item = localStorage.getItem("email_verified");
  const [User, setUser] = useState<User | null>(null);
  auth.onAuthStateChanged((user) => {
    if (!user) return setUser(null);
    setUser(user);
  });
  return (
    <>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route
              path="/get-started"
              element={item ? <Navigate replace to={"/"} /> : <Hero />}
            />
            <Route path="/about-us" element={<About />} />
          </Route>
          <Route
            path="/"
            element={item ? <Home /> : <Navigate replace to={"/get-started"} />}
          />
          <Route
            path="/login"
            element={
              item ? (
                <Navigate replace to={`/users/show/${User && User.uid}`} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path={"/users/show/:id"}
            element={item ? <Profile /> : <Navigate replace to={"/login"} />}
          />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
