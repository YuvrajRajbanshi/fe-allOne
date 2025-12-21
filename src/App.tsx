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
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { Toaster } from "react-hot-toast";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login, logout } from "./redux/slices/userSlices";

import { useState } from "react";
function App() {
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const apiURL = (
        typeof import.meta.env.VITE_API_URL === "string" &&
        import.meta.env.VITE_API_URL.trim().length > 0
          ? import.meta.env.VITE_API_URL.trim()
          : "https://be-allone.onrender.com"
      ).replace(/\/+$/, "");
      axios
        .get(`${apiURL}/api/users/verify-token`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data && res.data.user) {
            dispatch(login({ email: res.data.user.email, token }));
          }
        })
        .catch(() => {
          dispatch(logout());
        })
        .finally(() => {
          setCheckingAuth(false);
        });
    } else {
      setCheckingAuth(false);
    }
  }, [dispatch]);
  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>Loading...</span>
      </div>
    );
  }
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
