import React from "react";

interface NoteItem {
  id: string;
  title: string;
  date: string;
}

interface PrivateNotesProps {
  notes?: NoteItem[];
  onAddNote?: () => void;
}

const PrivateNotes: React.FC<PrivateNotesProps> = ({
  notes = [
    { id: "1", title: "System design ideas", date: "April 16, 2024" },
    { id: "2", title: "React coding tips", date: "April 10, 2024" },
  ],
  onAddNote,
}) => {
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

      {/* Notes List */}
      <div className="space-y-4 mb-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-indigo-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-800">{note.title}</p>
              <p className="text-sm text-gray-400">{note.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Note Button */}
      <button
        onClick={onAddNote}
        className="flex items-center gap-2 text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
      >
        <span className="text-lg">+</span>
        <span>Add note</span>
      </button>
    </div>
  );
};

export default PrivateNotes;
