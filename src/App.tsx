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
import api from "./api/axiosInstance";
import { login, logout } from "./redux/slices/userSlices";

import { useState } from "react";
function App() {
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get(`/api/users/verify-token`)
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-10 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Main loading container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Animated vault icon */}
          <div className="relative animate-float">
            {/* Outer ring */}
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-indigo-200 animate-pulse-ring"></div>

            {/* Main vault circle */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl shadow-indigo-200">
              {/* Lock icon */}
              <svg
                className="w-10 h-10 text-white animate-lock"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </div>

            {/* Sparkle decorations */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            <div
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-400 rounded-full animate-ping"
              style={{ animationDelay: "0.3s" }}
            ></div>
          </div>

          {/* App name */}
          <h1 className="mt-8 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            All-One
          </h1>

          {/* Loading text with shimmer */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-gray-500 text-sm">Unlocking your vault</span>
            <span className="flex gap-1">
              <span
                className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></span>
              <span
                className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></span>
              <span
                className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-6 w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-shimmer rounded-full"></div>
          </div>
        </div>

        {/* Footer hint */}
        <p className="absolute bottom-8 text-xs text-gray-400">
          Your private sanctuary awaits...
        </p>
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
