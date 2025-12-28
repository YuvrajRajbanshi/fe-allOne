import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/userStore";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";

const AddDocument = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userId = useSelector((state: RootState) => state.user.userId);

  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Please select a valid document (PDF, Word, Excel, PowerPoint, or Text)"
      );
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error("File size must be less than 20MB");
      return;
    }

    setSelectedFile(file);
    if (!title) {
      // Auto-fill title from filename without extension
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setTitle(nameWithoutExt);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("You must be logged in to upload documents");
      navigate("/login");
      return;
    }

    if (!selectedFile || !title.trim()) {
      toast.error("Please select a file and add a title");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("userId", userId);
      formData.append("title", title.trim());

      await api.post(`/api/documents/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Document uploaded successfully!");
      navigate("/vault");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) {
      return (
        <svg
          className="w-12 h-12 text-red-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
        </svg>
      );
    }
    if (type.includes("word") || type.includes("document")) {
      return (
        <svg
          className="w-12 h-12 text-blue-600"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
        </svg>
      );
    }
    if (type.includes("excel") || type.includes("spreadsheet")) {
      return (
        <svg
          className="w-12 h-12 text-green-600"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
        </svg>
      );
    }
    if (type.includes("powerpoint") || type.includes("presentation")) {
      return (
        <svg
          className="w-12 h-12 text-orange-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
        </svg>
      );
    }
    return (
      <svg
        className="w-12 h-12 text-gray-500"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
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
              Upload Document
            </h1>
            <p className="text-gray-500 text-sm">
              PDF, Word, Excel, PowerPoint (max 20MB)
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6">
            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Document
              </label>
              <div
                onClick={() => !selectedFile && fileInputRef.current?.click()}
                className={`relative rounded-2xl border-2 border-dashed transition-colors overflow-hidden ${
                  selectedFile
                    ? "border-transparent bg-gray-50"
                    : "border-gray-200 hover:border-amber-400 cursor-pointer"
                }`}
              >
                {selectedFile ? (
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      {getFileIcon(selectedFile.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                        className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-red-500"
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
                ) : (
                  <div className="py-12 px-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-amber-50 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium mb-1">
                      Click to upload document
                    </p>
                    <p className="text-sm text-gray-400">
                      PDF, Word, Excel, PowerPoint, or Text
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading || !selectedFile || !title.trim()}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                <>
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Upload Document
                </>
              )}
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

export default AddDocument;
