import React from "react";

interface DateItem {
  id: string;
  icon: "birthday" | "anniversary" | "event";
  title: string;
  date: string;
}

interface ImportantDatesProps {
  dates?: DateItem[];
  onAddDate?: () => void;
}

const ImportantDates: React.FC<ImportantDatesProps> = ({
  dates = [
    { id: "1", icon: "birthday", title: "Birthday", date: "January 12, 2024" },
    {
      id: "2",
      icon: "anniversary",
      title: "College Anniversary",
      date: "April 2024",
    },
  ],
  onAddDate,
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "birthday":
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-yellow-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm5 8v6h-3v-5.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V20H9v-5.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V20H5v-6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2z" />
            </svg>
          </div>
        );
      case "anniversary":
        return (
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-green-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
            </svg>
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

      {/* Dates List */}
      <div className="space-y-4 mb-6">
        {dates.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {getIcon(item.icon)}
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-400">{item.date}</p>
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
        ))}
      </div>

      {/* Add Date Button */}
      <button
        onClick={onAddDate}
        className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
      >
        <span className="text-lg">+</span>
        <span>Add date</span>
      </button>
    </div>
  );
};

export default ImportantDates;
