import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/userStore";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";

interface NoteFormData {
  title: string;
  content: string;
  color: string;
}

const AddNote = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.userId);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<NoteFormData>({
    title: "",
    content: "",
    color: "white",
  });

  const noteColors = [
    { id: "white", bg: "bg-white", border: "border-gray-200" },
    { id: "yellow", bg: "bg-yellow-50", border: "border-yellow-200" },
    { id: "green", bg: "bg-green-50", border: "border-green-200" },
    { id: "blue", bg: "bg-blue-50", border: "border-blue-200" },
    { id: "purple", bg: "bg-purple-50", border: "border-purple-200" },
    { id: "pink", bg: "bg-pink-50", border: "border-pink-200" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("You must be logged in");
      navigate("/login");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Please add a title");
      return;
    }

    setIsLoading(true);
    try {
      await api.post(`/api/notes`, {
        userId,
        title: formData.title.trim(),
        content: formData.content,
        color: formData.color,
      });
      toast.success("Note saved!");
      navigate("/vault");
    } catch (error) {
      console.error("Failed to save note:", error);
      toast.error("Failed to save note");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedColor = noteColors.find((c) => c.id === formData.color);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 px-4 py-8 overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/vault")}
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
              Add Private Note
            </h1>
            <p className="text-gray-500 text-sm">
              Your thoughts, securely stored
            </p>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <div
            className={`rounded-3xl shadow-lg p-6 md:p-8 space-y-6 ${selectedColor?.bg} ${selectedColor?.border} border-2`}
          >
            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Note color
              </label>
              <div className="flex gap-3">
                {noteColors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, color: color.id })
                    }
                    className={`w-10 h-10 rounded-full ${color.bg} border-2 ${
                      color.border
                    } transition-all ${
                      formData.color === color.id
                        ? "ring-2 ring-indigo-500 ring-offset-2"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Give your note a title..."
                className={`w-full px-4 py-3 rounded-xl border ${selectedColor?.border} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white/50`}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Start writing your thoughts..."
                rows={10}
                className={`w-full px-4 py-3 rounded-xl border ${selectedColor?.border} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none bg-white/50`}
              />
            </div>

            {/* Security Info */}
            <div className="flex items-center gap-3 p-4 bg-white/60 rounded-xl">
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
                <p className="text-sm font-medium text-gray-700">
                  End-to-end encrypted
                </p>
                <p className="text-xs text-gray-500">
                  Only you can read this note
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Note"}
            </button>
          </div>
        </form>
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

export default AddNote;
