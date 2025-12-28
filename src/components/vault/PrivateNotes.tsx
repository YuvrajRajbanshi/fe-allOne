import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/userStore";

interface CategoryItem {
  _id: string;
  name: string;
  color: string;
  itemCount: number;
}

interface PrivateNotesProps {
  onAddNote?: () => void;
}

const PrivateNotes: React.FC<PrivateNotesProps> = ({ onAddNote }) => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.userId);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchCategories();
    }
  }, [userId]);

  const fetchCategories = async () => {
    try {
      const response = await api.get(`/api/note-categories/user/${userId}`);
      setCategories(response.data.categories.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      red: "bg-red-100",
      orange: "bg-orange-100",
      yellow: "bg-yellow-100",
      green: "bg-green-100",
      blue: "bg-blue-100",
      indigo: "bg-indigo-100",
      purple: "bg-purple-100",
      pink: "bg-pink-100",
    };
    return colors[color] || "bg-indigo-100";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-indigo-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
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
      <h3 className="text-xl font-bold text-gray-800 mb-6">Private notes</h3>

      {/* Categories List */}
      <div className="space-y-3 mb-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => navigate(`/vault/notes/${cat._id}`)}
              className={`flex items-center gap-3 p-3 rounded-xl hover:opacity-80 transition-all cursor-pointer ${getColorClass(
                cat.color
              )}`}
            >
              <div className="w-8 h-8 bg-white/60 rounded-lg flex items-center justify-center">
                <span className="text-lg">📝</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{cat.name}</p>
                <p className="text-sm text-gray-400">{cat.itemCount} notes</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-gray-200"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
            <p className="text-sm">No categories yet</p>
          </div>
        )}
      </div>

      {/* View All Button */}
      <button
        onClick={onAddNote}
        className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
      >
        <span className="text-lg">→</span>
        <span>View all categories</span>
      </button>
    </div>
  );
};

export default PrivateNotes;
