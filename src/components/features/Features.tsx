import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/hero/image.png";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const navigate = useNavigate();

  const vaultIcon = (
    <div className="relative">
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl flex items-center justify-center">
        <svg
          className="w-12 h-12 text-indigo-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
      </div>
      <div className="absolute -top-2 -right-2 w-3 h-3 bg-indigo-200 rounded-full"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-300 rounded-full"></div>
    </div>
  );

  const albumsIcon = (
    <div className="relative">
      <div className="flex items-center justify-center gap-2">
        <div className="w-16 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center relative">
          <svg
            className="w-8 h-8 text-amber-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
          </svg>
        </div>
        <div className="relative">
          <div className="w-14 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg absolute -rotate-6 -left-2 top-1 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-emerald-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
          <div className="w-14 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg relative z-10 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center z-20">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  const vaultFeatures = [
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      text: "Important dates",
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      text: "Private notes",
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      text: "Personal photos",
    },
  ];

  const albumsFeatures = [
    {
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
        </svg>
      ),
      text: "Organize your photos",
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      text: "Hide thumbnails",
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      text: "Advanced face blur",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 flex flex-col items-center justify-start px-4 overflow-hidden relative pt-8">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Hero Section with Image */}
      <div className="relative w-full max-w-4xl mb-8 z-10">
        <div className="flex justify-end items-start pr-4 md:pr-12">
          <div className="relative">
            <img
              src={heroImage}
              alt="Person working on laptop"
              className="w-[200px] md:w-[280px] lg:w-[320px] h-auto relative z-10 rounded-2xl"
            />
            <div className="absolute -top-4 -left-8 bg-white rounded-xl shadow-lg p-2 animate-float">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-indigo-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
            </div>
            <div className="absolute top-2 right-0 bg-white rounded-xl shadow-lg p-2 animate-float-delayed">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-4xl px-4 z-10 mb-12">
        <FeatureCard
          icon={vaultIcon}
          title="Personal Vault"
          features={vaultFeatures}
          footerText="Stored securely. Visible only to you."
          onClick={() => navigate("/vault")}
        />
        <FeatureCard
          icon={albumsIcon}
          title="Memory Albums"
          features={albumsFeatures}
          footerText="Memories stay private unless you share them."
          onClick={() => navigate("/albums")}
        />
      </div>

      {/* Continue Button */}
      <button
        onClick={() => navigate("/register")}
        className="group relative bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 z-10 mb-8"
      >
        <span className="relative z-10">Continue to Sign Up</span>
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3.5s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Features;
