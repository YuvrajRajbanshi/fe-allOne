import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/userStore";
import CategoryCard from "./CategoryCard";

interface DocCategoryType {
  _id: string;
  name: string;
  thumbnail: string;
  description?: string;
  itemCount: number;
}

const DocCategories: React.FC = () => {
  const rawApiURL = import.meta.env.VITE_API_URL as string | undefined;
  const apiURL = (
    typeof rawApiURL === "string" && rawApiURL.trim().length > 0
      ? rawApiURL.trim()
      : "https://be-allone.onrender.com"
  ).replace(/\/+$/, "");

  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.userId);
  const [categories, setCategories] = useState<DocCategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchCategories();
    }
  }, [userId]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/doc-categories/user/${userId}`
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch document categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/vault")}
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                My Documents
              </h1>
              <p className="text-gray-500 text-sm">
                Store your important files securely
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/vault/documents/add-category")}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
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
            <span className="hidden sm:inline">New Category</span>
          </button>
        </div>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                _id={category._id}
                name={category.name}
                thumbnail={category.thumbnail}
                itemCount={category.itemCount}
                onClick={() => navigate(`/vault/documents/${category._id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl">📄</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No categories yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              Create categories like "Medical Records", "Certificates" to
              organize your documents
            </p>
            <button
              onClick={() => navigate("/vault/documents/add-category")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
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
              Create Your First Category
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocCategories;
