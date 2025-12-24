import React from "react";

interface AlbumCardProps {
  id: string;
  name: string;
  date: string;
  photoCount: number;
  thumbnail?: string;
  isBlurred?: boolean;
  onClick?: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  name,
  date,
  photoCount,
  thumbnail,
  isBlurred = true,
  onClick,
}) => {
  // Placeholder gradients for thumbnails
  const placeholderGradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  ];

  const randomGradient =
    placeholderGradients[
      Math.floor(Math.random() * placeholderGradients.length)
    ];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              isBlurred ? "blur-md" : ""
            }`}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
              isBlurred ? "blur-sm" : ""
            }`}
            style={{ background: randomGradient }}
          >
            <svg
              className="w-16 h-16 text-white/40"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        )}

        {/* Lock Badge */}
        <div className="absolute top-3 left-3 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shadow-sm">
          <svg
            className="w-4 h-4 text-indigo-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-1">{name}</h3>
        <p className="text-sm text-indigo-400">
          {date} · {photoCount} photos
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;
