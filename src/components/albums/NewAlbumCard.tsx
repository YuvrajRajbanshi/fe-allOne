import React from "react";

interface NewAlbumCardProps {
  onClick?: () => void;
}

const NewAlbumCard: React.FC<NewAlbumCardProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border-2 border-dashed border-indigo-200 overflow-hidden hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-300 cursor-pointer group flex items-center justify-center min-h-[240px]"
    >
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
          <svg
            className="w-6 h-6 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <span className="text-indigo-400 font-medium">New album</span>
      </div>
    </div>
  );
};

export default NewAlbumCard;
