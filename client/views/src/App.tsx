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

function App() {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Hero />} />
          </Route>
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
