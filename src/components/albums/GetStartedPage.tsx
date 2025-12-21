import heroImage from "../../assets/hero/image.png";
import { useNavigate } from "react-router-dom";

const GetStartedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center py-16 px-6 relative">
      {/* Illustration top-right */}
      <img
        src={heroImage}
        alt="illustration"
        className="hidden md:block absolute top-8 right-12 w-80 opacity-90 rounded-2xl drop-shadow-2xl"
      />

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-indigo-50 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-indigo-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 1C8.1 1 5 4.1 5 8v3H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2h-1V8c0-3.9-3.1-7-7-7zm1 14h-2v-2h2v2zm1-7H10V8c0-1.7 1.3-3 3-3s3 1.3 3 3v0z" />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Personal Vault
            </h2>

            <ul className="text-gray-500 space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-indigo-300 mt-1">📅</span>
                <span>Important dates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-300 mt-1">🔒</span>
                <span>Private notes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-300 mt-1">🖼️</span>
                <span>Personal photos</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-400">
            Stored securely. Visible only to you.
          </p>
        </div>

        {/* Card 2 */}
        <div
          role="button"
          onClick={() => navigate("/memory-albums")}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div>
            <div className="w-16 h-16 bg-indigo-50 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-blue-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 19V5a1 1 0 00-1-1H8L3 8v11a1 1 0 001 1h16a1 1 0 001-1zM8 7V5h11v2H8z" />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Memory Albums
            </h2>

            <ul className="text-gray-500 space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-indigo-300 mt-1">🗂️</span>
                <span>Organize your photos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-300 mt-1">👁️‍🗨️</span>
                <span>Hide thumbnails</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-300 mt-1">🔎</span>
                <span>Advanced face blur</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-400">
            Memories stay private unless you share them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
