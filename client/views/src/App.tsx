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
import { useEffect, useState } from "react";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const item = localStorage.getItem("ID");
  const [User, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) return setUser(null);
      setUser(user);
      console.log(User);
    });
  }, []);

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
            element={item ? <Navigate replace to={"/"} /> : <Login />}
          />
          <Route
            path={"/users/show/:id"}
            element={item ? <Profile /> : <Navigate replace to={"/login"} />}
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
