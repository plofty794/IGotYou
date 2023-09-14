import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import RootLayout from "./RootLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Hero />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
