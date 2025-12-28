import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/userStore";

interface CategoryItem {
  _id: string;
  name: string;
  itemCount: number;
}

interface MyDocumentsProps {
  onAddDocument?: () => void;
}

const MyDocuments: React.FC<MyDocumentsProps> = ({ onAddDocument }) => {
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
      const response = await api.get(`/api/doc-categories/user/${userId}`);
      setCategories(response.data.categories.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-blue-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
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
      <h3 className="text-xl font-bold text-gray-800 mb-6">My Documents</h3>

      {/* Categories List */}
      <div className="space-y-3 mb-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => navigate(`/vault/documents/${cat._id}`)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <span className="text-xl">📁</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{cat.name}</p>
                <p className="text-xs text-gray-400">
                  {cat.itemCount} documents
                </p>
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
        onClick={onAddDocument}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
      >
        <span className="text-lg">→</span>
        <span>View all categories</span>
      </button>
    </div>
  );
};

export default MyDocuments;
