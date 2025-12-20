import "./App.css";
import Navbar from "./navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Profile from "./navbar/profile/Profile";
import Logout from "./navbar/logout/Logout";
import Home from "./navbar/home/Home";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import OtpVerification from "./pages/auth/OtpVerification";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <div className="mb-10">
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
