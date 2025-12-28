import React, { useState, useRef } from "react";
import api from "../../api/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import type { RootState } from "../../redux/userStore";

interface AddDateCategoryProps {
  onSuccess?: () => void;
}

const AddDateCategory: React.FC<AddDateCategoryProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.userId);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "event" as "birthday" | "anniversary" | "event" | "other",
    description: "",
    thumbnail: "",
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setIsUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const response = await api.post(`/api/images/upload`, formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData((prev) => ({ ...prev, thumbnail: response.data.url }));
      toast.success("Thumbnail uploaded!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload thumbnail");
      setThumbnailPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post(`/api/date-categories`, {
        userId,
        name: formData.name,
        type: formData.type,
        thumbnail: formData.thumbnail,
        description: formData.description,
      });

      toast.success("Category created successfully!");
      onSuccess?.();
      navigate("/vault/dates");
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryTypes = [
    { value: "birthday", label: "Birthday", emoji: "🎂" },
    { value: "anniversary", label: "Anniversary", emoji: "💍" },
    { value: "event", label: "Event", emoji: "📅" },
    { value: "other", label: "Other", emoji: "📁" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50 px-4 py-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
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
            <h1 className="text-2xl font-bold text-gray-800">
              New Date Category
            </h1>
            <p className="text-gray-500 text-sm">
              Create a folder for your important dates
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thumbnail Upload */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category Thumbnail
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-video rounded-xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-orange-400 transition-colors cursor-pointer group"
            >
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors">
                  {isUploading ? (
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg
                        className="w-12 h-12 mb-2"
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
                      <span className="text-sm">Click to upload thumbnail</span>
                    </>
                  )}
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          {/* Category Name */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., Family Birthdays, Work Events"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
            />
          </div>

          {/* Category Type */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categoryTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      type: type.value as any,
                    }))
                  }
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    formData.type === type.value
                      ? "border-orange-400 bg-orange-50"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <span className="text-2xl">{type.emoji}</span>
                  <span className="font-medium text-gray-700">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Add a description for this category..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </span>
            ) : (
              "Create Category"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDateCategory;
