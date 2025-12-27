import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import type { RootState } from "../../redux/userStore";

interface DateItem {
  _id: string;
  title: string;
  date: string;
  description?: string;
  reminder: boolean;
}

interface Category {
  _id: string;
  name: string;
  type: string;
  thumbnail: string;
  description?: string;
}

const DateCategoryDetail: React.FC = () => {
  const rawApiURL = import.meta.env.VITE_API_URL as string | undefined;
  const apiURL = (
    typeof rawApiURL === "string" && rawApiURL.trim().length > 0
      ? rawApiURL.trim()
      : "https://be-allone.onrender.com"
  ).replace(/\/+$/, "");

  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.userId);

  const [category, setCategory] = useState<Category | null>(null);
  const [dates, setDates] = useState<DateItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDate, setNewDate] = useState({
    title: "",
    date: "",
    description: "",
    reminder: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/date-categories/${categoryId}`
      );
      setCategory(response.data.category);
      setDates(response.data.dates);
    } catch (error) {
      console.error("Failed to fetch category:", error);
      toast.error("Failed to load category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate.title.trim() || !newDate.date) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${apiURL}/api/dates`, {
        userId,
        categoryId,
        title: newDate.title,
        date: newDate.date,
        description: newDate.description,
        reminder: newDate.reminder,
      });

      toast.success("Date added successfully!");
      setShowAddModal(false);
      setNewDate({ title: "", date: "", description: "", reminder: false });
      fetchCategoryData();
    } catch (error) {
      console.error("Failed to add date:", error);
      toast.error("Failed to add date");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDate = async (dateId: string) => {
    if (!confirm("Are you sure you want to delete this date?")) return;

    try {
      await axios.delete(`${apiURL}/api/dates/${dateId}`, {
        data: { userId },
      });
      toast.success("Date deleted!");
      fetchCategoryData();
    } catch (error) {
      console.error("Failed to delete date:", error);
      toast.error("Failed to delete date");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "birthday":
        return "🎂";
      case "anniversary":
        return "💍";
      case "event":
        return "📅";
      default:
        return "📁";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/vault/dates")}
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
            <div className="flex items-center gap-3">
              <span className="text-3xl">{getTypeIcon(category?.type)}</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {category?.name}
                </h1>
                {category?.description && (
                  <p className="text-gray-500 text-sm">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
          >
            <svg
              className="w-5 h-5"
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
            <span className="hidden sm:inline">Add Date</span>
          </button>
        </div>

        {/* Dates List */}
        {dates.length > 0 ? (
          <div className="space-y-4">
            {dates.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-orange-500 font-medium text-sm mb-2">
                      {formatDate(item.date)}
                    </p>
                    {item.description && (
                      <p className="text-gray-500 text-sm">
                        {item.description}
                      </p>
                    )}
                    {item.reminder && (
                      <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        Reminder set
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteDate(item._id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">{getTypeIcon(category?.type)}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No dates yet
            </h3>
            <p className="text-gray-500 mb-6">
              Add your first important date to this category
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
            >
              <svg
                className="w-5 h-5"
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
              Add First Date
            </button>
          </div>
        )}
      </div>

      {/* Add Date Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-scale-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Add New Date</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
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

            <form onSubmit={handleAddDate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newDate.title}
                  onChange={(e) =>
                    setNewDate((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g., Mom's Birthday"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={newDate.date}
                  onChange={(e) =>
                    setNewDate((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newDate.description}
                  onChange={(e) =>
                    setNewDate((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Add a note..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none resize-none"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newDate.reminder}
                  onChange={(e) =>
                    setNewDate((prev) => ({
                      ...prev,
                      reminder: e.target.checked,
                    }))
                  }
                  className="w-5 h-5 rounded text-orange-500 focus:ring-orange-400"
                />
                <span className="text-sm text-gray-700">Set reminder</span>
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Adding..." : "Add Date"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-up {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up {
          animation: scale-up 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DateCategoryDetail;
