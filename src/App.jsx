import { HashRouter , Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Events from "./pages/Events";
import Sports from "./pages/Sports";

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sports" element={<Sports />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
