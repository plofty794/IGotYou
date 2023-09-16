import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import RootLayout from "./RootLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Hero />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
