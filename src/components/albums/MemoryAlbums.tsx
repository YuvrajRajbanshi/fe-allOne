import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlbumCard from "./AlbumCard";
import NewAlbumCard from "./NewAlbumCard";

interface Album {
  id: string;
  name: string;
  date: string;
  photoCount: number;
  thumbnail?: string;
}

const MemoryAlbums = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("Date created");
  const [blurFaces, setBlurFaces] = useState(true);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Sample albums data
  const albums: Album[] = [
    {
      id: "1",
      name: "Family Trip <3",
      date: "July 2023",
      photoCount: 256,
    },
    {
      id: "2",
      name: "College Days",
      date: "2022-2024",
      photoCount: 156,
    },
    {
      id: "3",
      name: "Celebrations",
      date: "166f year",
      photoCount: 154,
    },
    {
      id: "4",
      name: "Nature",
      date: "",
      photoCount: 50,
    },
    {
      id: "5",
      name: "Mumbai",
      date: "September 2023",
      photoCount: 30,
    },
  ];

  const sortOptions = ["Date created", "Name", "Photo count", "Last modified"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 px-4 py-8 overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Memory Albums
            </h1>
            <p className="text-gray-500">
              Memories stay private unless you share them.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="text-sm text-gray-400">Sort by:</span>
                <span className="font-medium">{sortBy}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showSortDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showSortDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[160px] z-20">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        sortBy === option
                          ? "text-indigo-500 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Blur Faces Toggle */}
            <button
              onClick={() => setBlurFaces(!blurFaces)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                blurFaces
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center ${
                  blurFaces ? "bg-indigo-200" : "bg-gray-200"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
              <span className="font-medium text-sm">Blur faces</span>
            </button>
          </div>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Album Card */}
          <NewAlbumCard onClick={() => navigate("/albums/new")} />

          {/* Album Cards */}
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              name={album.name}
              date={album.date}
              photoCount={album.photoCount}
              thumbnail={album.thumbnail}
              isBlurred={blurFaces}
              onClick={() => navigate(`/albums/${album.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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

export default MemoryAlbums;
