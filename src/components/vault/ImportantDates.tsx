import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/userStore";

interface CategoryItem {
  _id: string;
  name: string;
  type: "birthday" | "anniversary" | "event" | "other";
  itemCount: number;
}

interface ImportantDatesProps {
  onAddDate?: () => void;
}

const ImportantDates: React.FC<ImportantDatesProps> = ({ onAddDate }) => {
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
      const response = await api.get(`/api/date-categories/user/${userId}`);
      setCategories(response.data.categories.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "birthday":
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
            <span className="text-lg">🎂</span>
          </div>
        );
      case "anniversary":
        return (
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-lg">💍</span>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-lg">📅</span>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-orange-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
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
      <h3 className="text-xl font-bold text-gray-800 mb-6">Important dates</h3>

      {/* Categories List */}
      <div className="space-y-3 mb-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : categories.length > 0 ? (
          categories.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/vault/dates/${item._id}`)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {getIcon(item.type)}
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    {item.itemCount} dates
                  </p>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400">
            <span className="text-3xl mb-2 block">📅</span>
            <p className="text-sm">No categories yet</p>
          </div>
        )}
      </div>

      {/* View All Button */}
      <button
        onClick={onAddDate}
        className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors"
      >
        <span className="text-lg">→</span>
        <span>View all categories</span>
      </button>
    </div>
  );
};

export default ImportantDates;
