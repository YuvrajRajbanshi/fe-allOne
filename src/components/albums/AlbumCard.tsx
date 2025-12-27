import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AlbumCardProps {
  id: string;
  name: string;
  date: string;
  thumbnail?: string;
  isBlurred?: boolean;
  apiURL: string;
  onClick?: () => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, newTitle: string, newThumbnail: string) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  id,
  name,
  date,
  thumbnail,
  isBlurred = true,
  apiURL,
  onClick,
  onDelete,
  onEdit,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(name);
  const [editThumbnail, setEditThumbnail] = useState(thumbnail || "");
  const [previewUrl, setPreviewUrl] = useState(thumbnail || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const confirmDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await axios.delete(`${apiURL}/api/album/delete-album`, {
        data: { _id: id },
      });
      toast.success("Album deleted successfully!");
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error("Failed to delete album:", error);
      toast.error("Failed to delete album");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditTitle(name);
    setEditThumbnail(thumbnail || "");
    setPreviewUrl(thumbnail || "");
    setShowEditModal(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    setPreviewUrl(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${apiURL}/api/images/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setEditThumbnail(response.data.url);
      toast.success("Image uploaded!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image");
      setPreviewUrl(thumbnail || "");
    } finally {
      setIsUploading(false);
    }
  };

  const confirmEdit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    if (!editThumbnail) {
      toast.error("Please add an image");
      return;
    }
    setIsUpdating(true);
    try {
      await axios.put(`${apiURL}/api/album/update-album`, {
        id: id,
        title: editTitle.trim(),
        url: editThumbnail,
      });
      toast.success("Album updated successfully!");
      if (onEdit) onEdit(id, editTitle.trim(), editThumbnail);
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update album:", error);
      toast.error("Failed to update album");
    } finally {
      setIsUpdating(false);
    }
  };

  const cancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditModal(false);
    setEditTitle(name);
    setEditThumbnail(thumbnail || "");
    setPreviewUrl(thumbnail || "");
  };

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

        {/* Action Buttons - Edit & Delete */}
        <div className="absolute top-3 right-3 flex gap-2">
          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center shadow-sm transition-colors duration-200"
            title="Edit album"
          >
            <svg
              className="w-4 h-4 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDeleteClick}
            className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center shadow-sm transition-colors duration-200"
            title="Delete album"
          >
            <svg
              className="w-4 h-4 text-red-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex items-center justify-center rounded-t-2xl backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl p-5 mx-3 shadow-2xl w-full max-w-[280px] transform transition-all">
              {/* Warning Icon */}
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-red-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </div>
              <h3 className="text-gray-900 font-semibold text-lg text-center mb-2">
                Delete Album?
              </h3>
              <p className="text-gray-500 text-sm text-center mb-5">
                This action cannot be undone. This will permanently delete your
                album.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Deleting</span>
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-1">{name}</h3>
        <p className="text-sm text-indigo-400">{date}</p>
      </div>

      {/* Edit Modal - Full Screen Overlay */}
      {showEditModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={cancelEdit}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-xl">
                    Edit Album
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Update your album details
                  </p>
                </div>
              </div>
              <button
                onClick={cancelEdit}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Image Preview & Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Album Thumbnail
                </label>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-blue-400 transition-all duration-300 cursor-pointer group bg-gray-50"
                >
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-white text-sm font-medium px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                          Click to change image
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
                      <div className="w-16 h-16 rounded-2xl bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition-colors">
                        <svg
                          className="w-8 h-8"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">
                        Click to upload image
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 10MB
                      </span>
                    </div>
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
                      <svg
                        className="animate-spin h-10 w-10 text-blue-500 mb-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">
                        Uploading...
                      </span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Album Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-gray-800 font-medium"
                  placeholder="Enter album title"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
              <button
                onClick={cancelEdit}
                className="flex-1 px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmEdit}
                disabled={isUpdating || isUploading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
              >
                {isUpdating ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
