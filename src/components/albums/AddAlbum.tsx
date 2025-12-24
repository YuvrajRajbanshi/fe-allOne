import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Photo {
  id: string;
  url: string;
  file?: File;
}

interface AlbumFormData {
  title: string;
  thumbnail: Photo | null;
  photos: Photo[];
  isPrivate: boolean;
}

const AddAlbum = () => {
  const navigate = useNavigate();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);
  const [formData, setFormData] = useState<AlbumFormData>({
    title: "",
    thumbnail: null,
    photos: [],
    isPrivate: true,
  });

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({
        ...formData,
        thumbnail: { id: Date.now().toString(), url, file },
      });
    }
  };

  const handlePhotosSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: Photo[] = Array.from(files).map((file, index) => ({
        id: `${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        file,
      }));
      setFormData({
        ...formData,
        photos: [...formData.photos, ...newPhotos],
      });
    }
  };

  const removePhoto = (photoId: string) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((p) => p.id !== photoId),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving album:", formData);
    // TODO: Save to backend
    navigate("/albums");
  };

  const handleThumbnailClick = () => {
    if (formData.thumbnail) {
      setIsAddingPhotos(true);
    } else {
      thumbnailInputRef.current?.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 px-4 py-8 overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => {
              if (isAddingPhotos) {
                setIsAddingPhotos(false);
              } else {
                navigate("/albums");
              }
            }}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {isAddingPhotos ? "Add Photos" : "Create New Album"}
            </h1>
            <p className="text-gray-500 text-sm">
              {isAddingPhotos
                ? `${formData.photos.length} photos added`
                : "Preserve your precious memories"}
            </p>
          </div>
        </div>

        {!isAddingPhotos ? (
          /* Album Setup View */
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6">
              {/* Thumbnail Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Album Cover
                </label>
                <div
                  onClick={handleThumbnailClick}
                  className="relative aspect-video rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-400 transition-colors cursor-pointer overflow-hidden group"
                >
                  {formData.thumbnail ? (
                    <>
                      <img
                        src={formData.thumbnail.url}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-center text-white">
                          <svg
                            className="w-10 h-10 mx-auto mb-2"
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
                          <p className="font-medium">Click to add photos</p>
                        </div>
                      </div>
                      {/* Change thumbnail button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          thumbnailInputRef.current?.click();
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-md"
                      >
                        <svg
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                      <svg
                        className="w-16 h-16 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="font-medium">Click to add album cover</p>
                      <p className="text-sm mt-1">
                        This will be your album thumbnail
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailSelect}
                  className="hidden"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Album Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Summer Vacation 2024"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              {/* Privacy Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-indigo-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Private Album</p>
                    <p className="text-sm text-gray-500">
                      Only you can see this album
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, isPrivate: !formData.isPrivate })
                  }
                  className={`w-12 h-7 rounded-full transition-colors ${
                    formData.isPrivate ? "bg-indigo-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      formData.isPrivate ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Info */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                <svg
                  className="w-5 h-5 text-blue-500 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-blue-700">
                  Click on the album cover after setting it to add more photos
                  to this album.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.title || !formData.thumbnail}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Album
              </button>
            </div>
          </form>
        ) : (
          /* Add Photos View */
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6">
            {/* Album Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              {formData.thumbnail && (
                <img
                  src={formData.thumbnail.url}
                  alt="Album"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold text-gray-800">
                  {formData.title || "Untitled Album"}
                </h3>
                <p className="text-sm text-gray-500">
                  {formData.photos.length} photos
                </p>
              </div>
            </div>

            {/* Add Photos Button */}
            <div
              onClick={() => photosInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 hover:border-indigo-400 rounded-2xl p-8 text-center cursor-pointer transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-indigo-500"
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
              <p className="font-medium text-gray-700">Add Photos</p>
              <p className="text-sm text-gray-500 mt-1">
                Click to select multiple photos
              </p>
            </div>
            <input
              ref={photosInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotosSelect}
              className="hidden"
            />

            {/* Photos Grid */}
            {formData.photos.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-700 mb-3">
                  Added Photos ({formData.photos.length})
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {formData.photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative aspect-square rounded-xl overflow-hidden group"
                    >
                      <img
                        src={photo.url}
                        alt="Photo"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Save Album
            </button>
          </div>
        )}
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
      `}</style>
    </div>
  );
};

export default AddAlbum;
