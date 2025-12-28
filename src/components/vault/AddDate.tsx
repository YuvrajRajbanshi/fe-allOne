import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/userStore";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";

interface DateFormData {
  title: string;
  date: string;
  type: "birthday" | "anniversary" | "event";
  description: string;
  reminder: boolean;
}

const AddDate = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.userId);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DateFormData>({
    title: "",
    date: "",
    type: "event",
    description: "",
    reminder: true,
  });

  const dateTypes = [
    { id: "birthday", label: "Birthday", icon: "🎂", color: "yellow" },
    { id: "anniversary", label: "Anniversary", icon: "💍", color: "green" },
    { id: "event", label: "Event", icon: "📅", color: "blue" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("You must be logged in");
      navigate("/login");
      return;
    }

    if (!formData.title.trim() || !formData.date) {
      toast.error("Please fill in title and date");
      return;
    }

    setIsLoading(true);
    try {
      await api.post(`/api/dates`, {
        userId,
        title: formData.title.trim(),
        date: formData.date,
        type: formData.type,
        description: formData.description.trim(),
        reminder: formData.reminder,
      });
      toast.success("Important date saved!");
      navigate("/vault");
    } catch (error) {
      console.error("Failed to save date:", error);
      toast.error("Failed to save date");
    } finally {
      setIsLoading(false);
    }
  };

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
              Add Important Date
            </h1>
            <p className="text-gray-500 text-sm">
              Never forget the moments that matter
            </p>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6">
            {/* Date Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What type of date is this?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {dateTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type: type.id as DateFormData["type"],
                      })
                    }
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      formData.type === type.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium text-gray-700">
                      {type.label}
                    </div>
                  </button>
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
                placeholder="e.g., Mom's Birthday, Wedding Anniversary"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Add a note about this date..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
              />
            </div>

            {/* Reminder Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-800">Set reminder</p>
                <p className="text-sm text-gray-500">
                  Get notified before this date
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, reminder: !formData.reminder })
                }
                className={`w-12 h-7 rounded-full transition-colors ${
                  formData.reminder ? "bg-indigo-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    formData.reminder ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Date"}
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

export default AddDate;
