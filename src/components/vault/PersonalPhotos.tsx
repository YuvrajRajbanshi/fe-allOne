import React from "react";

interface PhotoAlbum {
  id: string;
  name: string;
  count: number;
  thumbnails: string[];
}

interface PersonalPhotosProps {
  albums?: PhotoAlbum[];
  onViewAlbums?: () => void;
}

const PersonalPhotos: React.FC<PersonalPhotosProps> = ({
  albums = [
    { id: "1", name: "Family Trip <3", count: 256, thumbnails: [] },
    { id: "2", name: "College Days", count: 156, thumbnails: [] },
  ],
  onViewAlbums,
}) => {
  // Placeholder images with gradients
  const placeholderImages = [
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
    "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-blue-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
          </svg>
        </div>
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-4 h-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">Personal photos</h3>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {placeholderImages.map((gradient, index) => (
          <div
            key={index}
            className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: gradient }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white/50"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Albums List */}
      <div className="space-y-3 mb-4">
        {albums.map((album) => (
          <div
            key={album.id}
            className="cursor-pointer hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
          >
            <p className="font-medium text-gray-800">{album.name}</p>
            <p className="text-sm text-gray-400">{album.count} photos</p>
          </div>
        ))}
      </div>

      {/* View Albums Button */}
      <button
        onClick={onViewAlbums}
        className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
      >
        <span className="text-lg">+</span>
        <span>View albums</span>
      </button>
    </div>
  );
};

export default PersonalPhotos;
