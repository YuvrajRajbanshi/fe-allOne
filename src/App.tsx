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
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Features from "./components/features/Features";
import PersonalVault from "./components/vault/PersonalVault";
import AddDate from "./components/vault/AddDate";
import AddNote from "./components/vault/AddNote";
import AddDocument from "./components/vault/AddDocument";
import MemoryAlbums from "./components/albums/MemoryAlbums";
import AddAlbum from "./components/albums/AddAlbum";
import AlbumDetail from "./components/albums/AlbumDetail";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { Toaster } from "react-hot-toast";

// Category imports
import DateCategories from "./components/vault/DateCategories";
import NoteCategories from "./components/vault/NoteCategories";
import DocCategories from "./components/vault/DocCategories";
import AddDateCategory from "./components/vault/AddDateCategory";
import AddNoteCategory from "./components/vault/AddNoteCategory";
import AddDocCategory from "./components/vault/AddDocCategory";
import DateCategoryDetail from "./components/vault/DateCategoryDetail";
import NoteCategoryDetail from "./components/vault/NoteCategoryDetail";
import DocCategoryDetail from "./components/vault/DocCategoryDetail";

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
            const storedUserId = localStorage.getItem("userId");
            dispatch(
              login({
                email: res.data.user.email,
                token,
                userId: res.data.user._id || storedUserId || "",
              })
            );
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
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />

          {/* Auth Routes - Redirect to home if already logged in */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Private Routes - Require Authentication */}
          <Route
            path="/vault"
            element={
              <PrivateRoute>
                <PersonalVault />
              </PrivateRoute>
            }
          />
          <Route
            path="/vault/add-date"
            element={
              <PrivateRoute>
                <AddDate />
              </PrivateRoute>
            }
          />
          <Route
            path="/vault/add-note"
            element={
              <PrivateRoute>
                <AddNote />
              </PrivateRoute>
            }
          />
          <Route
            path="/vault/add-document"
            element={
              <PrivateRoute>
                <AddDocument />
              </PrivateRoute>
            }
          />

          {/* Date Categories Routes */}
          <Route
            path="/vault/dates"
            element={
              <PrivateRoute>
                <DateCategories />
              </PrivateRoute>
            }
          />
          <Route
            path="/vault/dates/add-category"
            element={
              <PrivateRoute>
                <AddDateCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/vault/dates/:categoryId"
            element={
              <PrivateRoute>
                <DateCategoryDetail />
              </PrivateRoute>
            }
          />

          {/* Note Categories Routes */}
          <Route
            path="/vault/notes"
            element={
              <PrivateRoute>
                <NoteCategories />
              </PrivateRoute>
            }
          />
          <Route
            path="/vault/notes/add-category"
            element={
              <PrivateRoute>
                <AddNoteCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/vault/notes/:categoryId"
            element={
              <PrivateRoute>
                <NoteCategoryDetail />
              </PrivateRoute>
            }
          />

          {/* Document Categories Routes */}
          <Route
            path="/vault/documents"
            element={
              <PrivateRoute>
                <DocCategories />
              </PrivateRoute>
            }
          />
          <Route
            path="/vault/documents/add-category"
            element={
              <PrivateRoute>
                <AddDocCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/vault/documents/:categoryId"
            element={
              <PrivateRoute>
                <DocCategoryDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/albums"
            element={
              <PrivateRoute>
                <MemoryAlbums />
              </PrivateRoute>
            }
          />
          <Route
            path="/albums/new"
            element={
              <PrivateRoute>
                <AddAlbum />
              </PrivateRoute>
            }
          />
          <Route
            path="/albums/:albumId"
            element={
              <PrivateRoute>
                <AlbumDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
