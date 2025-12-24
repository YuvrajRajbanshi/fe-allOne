import Typewriter from "typewriter-effect";
import heroImage from "../../assets/hero/image.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Typewriter Heading */}
      <div className="text-center mb-6 min-h-30 md:min-h-36 flex items-center justify-center z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              delay: 40,
              deleteSpeed: 20,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  'A private space for <span class="text-indigo-500">personal<br/>memories and information</span>'
                )
                .pauseFor(2500)
                .deleteAll()
                .typeString(
                  'For the things you <span class="text-indigo-500">don\'t post online</span>'
                )
                .pauseFor(2500)
                .deleteAll()
                .typeString(
                  'Your digital <span class="text-indigo-500">journal, diary, and notebook</span><br/>all in one place'
                )
                .pauseFor(2500)
                .deleteAll()
                .typeString(
                  'What\'s <span class="text-indigo-500">personal</span> stays <span class="text-indigo-500">personal</span>'
                )
                .pauseFor(2500)
                .deleteAll()
                .typeString(
                  '<span class="text-indigo-500">Private</span> by default'
                )
                .pauseFor(2500)
                .deleteAll()
                .start();
            }}
          />
        </h1>
      </div>

      {/* Hero Section with Image and Floating Elements */}
      <div className="relative w-full max-w-5xl mb-6 z-10 px-4">
        {/* Floating Elements - Distributed across the width */}

        {/* Lock Icon - Far Left */}
        <div className="absolute left-0 md:left-8 top-1/3 bg-white rounded-2xl shadow-lg p-3 hover:scale-110 transition-transform duration-300 cursor-pointer animate-float z-20">
          <div className="w-8 h-8 text-yellow-500">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
        </div>

        {/* Star Icon - Left top */}
        <div className="absolute left-16 md:left-32 top-4 bg-white rounded-xl shadow-lg p-2.5 hover:scale-110 transition-transform duration-300 cursor-pointer animate-float-delayed z-20">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>

        {/* Security/Lock Icon - Center-left top */}
        <div className="absolute left-1/4 md:left-1/3 -top-2 bg-white rounded-xl shadow-lg p-2.5 hover:scale-110 transition-transform duration-300 cursor-pointer animate-float z-20">
          <div className="w-10 h-10 bg-linear-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
        </div>

        {/* Image Icon - Center top */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-4 bg-white rounded-xl shadow-lg p-2.5 hover:scale-110 transition-transform duration-300 cursor-pointer animate-float-delayed z-20">
          <div className="w-10 h-10 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-500"
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

        {/* Home Icon - Center-right top */}
        <div className="absolute right-1/4 md:right-1/3 top-0 bg-white rounded-xl shadow-lg p-2.5 hover:scale-110 transition-transform duration-300 cursor-pointer animate-float z-20">
          <div className="w-10 h-10 bg-linear-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
        </div>

        {/* Document/Chat Icon - Right top */}
        <div className="absolute right-16 md:right-32 top-6 bg-white rounded-xl shadow-lg p-2.5 hover:scale-110 transition-transform duration-300 cursor-pointer animate-float-delayed z-20">
          <div className="w-10 h-10 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
        </div>

        {/* Chart/Analytics Icon - Far Right */}
        <div className="absolute right-0 md:right-8 top-1/3 bg-white rounded-2xl shadow-lg p-3 hover:scale-110 transition-transform duration-300 cursor-pointer animate-float z-20">
          <div className="flex items-end space-x-1 h-10">
            <div className="w-1.5 h-3 bg-blue-300 rounded-sm"></div>
            <div className="w-1.5 h-5 bg-blue-400 rounded-sm"></div>
            <div className="w-1.5 h-8 bg-blue-500 rounded-sm"></div>
            <div className="w-1.5 h-4 bg-blue-400 rounded-sm"></div>
            <div className="w-1.5 h-10 bg-indigo-500 rounded-sm"></div>
          </div>
        </div>

        {/* Main Image Container */}
        <div className="flex justify-center items-center pt-12">
          <div className="relative">
            {/* Soft glow behind */}
            <div className="absolute inset-0 bg-linear-to-br from-pink-100 via-purple-50 to-blue-100 rounded-3xl blur-2xl opacity-50 scale-105"></div>

            {/* Hero Image with shadow */}
            <img
              src={heroImage}
              alt="Couple working on laptop"
              className="w-[280px] md:w-[380px] lg:w-[450px] h-auto relative z-10 rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Plant Pots at Bottom */}
        {/* Left Plant */}
        <div className="absolute left-4 md:left-16 bottom-0 z-20">
          <svg
            width="60"
            height="80"
            viewBox="0 0 60 80"
            className="w-12 md:w-16"
          >
            {/* Pot */}
            <path d="M15 50 L20 75 L40 75 L45 50 Z" fill="#E07B54" />
            <ellipse cx="30" cy="50" rx="17" ry="5" fill="#C96A45" />
            <ellipse cx="30" cy="75" rx="12" ry="4" fill="#B85A35" />
            {/* Leaves */}
            <path d="M30 50 Q25 35 15 25 Q28 30 30 50" fill="#4ADE80" />
            <path d="M30 50 Q35 30 50 20 Q35 32 30 50" fill="#22C55E" />
            <path d="M30 50 Q22 38 12 35 Q25 38 30 50" fill="#86EFAC" />
            <path d="M30 50 Q38 35 48 32 Q35 38 30 50" fill="#4ADE80" />
            <path d="M30 50 Q30 35 30 20 Q32 35 30 50" fill="#16A34A" />
          </svg>
        </div>

        {/* Right Plant */}
        <div className="absolute right-4 md:right-16 bottom-0 z-20">
          <svg
            width="60"
            height="80"
            viewBox="0 0 60 80"
            className="w-12 md:w-16"
          >
            {/* Pot */}
            <path d="M15 50 L20 75 L40 75 L45 50 Z" fill="#E07B54" />
            <ellipse cx="30" cy="50" rx="17" ry="5" fill="#C96A45" />
            <ellipse cx="30" cy="75" rx="12" ry="4" fill="#B85A35" />
            {/* Leaves */}
            <path d="M30 50 Q25 35 15 25 Q28 30 30 50" fill="#22C55E" />
            <path d="M30 50 Q35 30 50 20 Q35 32 30 50" fill="#4ADE80" />
            <path d="M30 50 Q20 40 10 38 Q23 40 30 50" fill="#86EFAC" />
            <path d="M30 50 Q40 38 52 35 Q38 40 30 50" fill="#22C55E" />
            <path d="M30 50 Q28 32 25 18 Q30 35 30 50" fill="#16A34A" />
            <path d="M30 50 Q32 30 38 15 Q32 35 30 50" fill="#4ADE80" />
          </svg>
        </div>

        {/* Small decorative dots */}
        <div className="absolute left-8 md:left-20 bottom-20 w-2 h-2 bg-yellow-300 rounded-full opacity-60"></div>
        <div className="absolute left-12 md:left-28 bottom-28 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute left-6 md:left-16 bottom-32 w-1 h-1 bg-yellow-300 rounded-full opacity-40"></div>
      </div>

      {/* Get Started Button */}
      <button
        onClick={() => navigate("/features")}
        className="group relative bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 z-10 mt-4"
      >
        <span className="relative z-10">Get Started</span>
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

export default Home;
