import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import type { RootState } from "../../redux/userStore";

interface NoteItem {
  _id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  _id: string;
  name: string;
  thumbnail: string;
  color: string;
  description?: string;
}

const NoteCategoryDetail: React.FC = () => {
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
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
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
        `${apiURL}/api/note-categories/${categoryId}`
      );
      setCategory(response.data.category);
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Failed to fetch category:", error);
      toast.error("Failed to load category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${apiURL}/api/notes`, {
        userId,
        categoryId,
        title: newNote.title,
        content: newNote.content,
      });

      toast.success("Note added successfully!");
      setShowAddModal(false);
      setNewNote({ title: "", content: "" });
      fetchCategoryData();
    } catch (error) {
      console.error("Failed to add note:", error);
      toast.error("Failed to add note");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`${apiURL}/api/notes/${noteId}`, {
        data: { userId },
      });
      toast.success("Note deleted!");
      setSelectedNote(null);
      fetchCategoryData();
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleTogglePin = async (note: NoteItem) => {
    try {
      await axios.put(`${apiURL}/api/notes/${note._id}`, {
        userId,
        isPinned: !note.isPinned,
      });
      fetchCategoryData();
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getColorClass = (color?: string) => {
    const colors: Record<string, string> = {
      red: "bg-red-500",
      orange: "bg-orange-500",
      yellow: "bg-yellow-500",
      green: "bg-green-500",
      blue: "bg-blue-500",
      indigo: "bg-indigo-500",
      purple: "bg-purple-500",
      pink: "bg-pink-500",
    };
    return colors[color || "indigo"] || colors.indigo;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/vault/notes")}
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
              <div
                className={`w-10 h-10 rounded-xl ${getColorClass(
                  category?.color
                )} flex items-center justify-center`}
              >
                <span className="text-white text-xl">📝</span>
              </div>
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
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md"
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
            <span className="hidden sm:inline">Add Note</span>
          </button>
        </div>

        {/* Notes Grid */}
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div
                key={note._id}
                onClick={() => setSelectedNote(note)}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 flex-1">
                    {note.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePin(note);
                    }}
                    className={`p-1 rounded-full transition-colors ${
                      note.isPinned
                        ? "text-indigo-500"
                        : "text-gray-300 group-hover:text-gray-400"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v1h1a2 2 0 012 2v1.5a1.5 1.5 0 01-1.5 1.5H14v5a3 3 0 01-6 0v-5H3.5A1.5 1.5 0 012 9.5V8a2 2 0 012-2h1V5z" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-500 text-sm line-clamp-3 mb-3">
                  {note.content || "No content"}
                </p>
                <p className="text-gray-400 text-xs">
                  {formatDate(note.updatedAt)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className={`w-20 h-20 ${getColorClass(
                category?.color
              )} rounded-full flex items-center justify-center mb-4 opacity-80`}
            >
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No notes yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start writing your first note in this category
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md"
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
              Write First Note
            </button>
          </div>
        )}
      </div>

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Add New Note</h2>
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

            <form onSubmit={handleAddNote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) =>
                    setNewNote((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Note title"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newNote.content}
                  onChange={(e) =>
                    setNewNote((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Write your note..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
                />
              </div>

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
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Adding..." : "Add Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Note Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedNote.title}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteNote(selectedNote._id)}
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
                <button
                  onClick={() => setSelectedNote(null)}
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
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Last updated: {formatDate(selectedNote.updatedAt)}
            </p>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">
                {selectedNote.content || "No content"}
              </p>
            </div>
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

export default NoteCategoryDetail;
