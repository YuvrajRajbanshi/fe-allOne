import { useState } from "react";
import heroImage from "../../assets/hero/image.png";
import Modal from "../../utils/DialogBox";
const sampleAlbums = [
  { title: "Family Trip <3", meta: "July 2023 · 256 photos" },
  { title: "College Days", meta: "2022-2024 · 156 photos" },
  { title: "Celebrations", meta: "166f ynui · 154 photos" },
  { title: "Nature", meta: "50 photos" },
  { title: "Mumbai", meta: "September 2023 · 30 photos" },
];

// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();
// };

const MemoryAlbums = () => {
  const [sortBy, setSortBy] = useState("Date created");
  const [open, setOpen] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  // const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleAlbumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle album creation logic here
    setOpen(false);
    setAlbumTitle("");
    // setThumbnail(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Memory Albums</h1>
            <p className="text-gray-500 mt-2">
              Memories stay private unless you share them.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Sort by:</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-3 pr-8 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <option>Date created</option>
                <option>Name</option>
                <option>Photos count</option>
              </select>
              <svg
                className="w-4 h-4 absolute right-2 top-2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
              </svg>
            </div>

            <button className="ml-4 inline-flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-4 py-2 shadow-sm">
              <svg
                className="w-5 h-5 text-indigo-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a2 2 0 012 2v2h-4V4a2 2 0 012-2zM6 8h12v10a2 2 0 01-2 2H8a2 2 0 01-2-2V8z" />
              </svg>
              <span className="text-sm text-gray-700">Blur faces</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {/* New Album card */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="border-2 border-dashed border-gray-200 rounded-xl h-44 flex items-center justify-center text-indigo-500 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">+</div>
              <div>New album</div>
            </div>
          </button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <form
              onSubmit={handleAlbumSubmit}
              className="p-6 flex flex-col gap-4 w-72"
            >
              <h2 className="text-xl font-semibold mb-2">Create New Album</h2>
              <label className="block text-sm font-medium text-gray-700">
                Album Title
              </label>
              <input
                type="text"
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter album title"
              />
              <label className="block text-sm font-medium text-gray-700">
                Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                // onChange={(e) =>
                //   // setThumbnail(e.target.files ? e.target.files[0] : null)
                // }
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                >
                  Create
                </button>
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
          {sampleAlbums.map((a, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-36">
                <img
                  src={heroImage}
                  alt={a.title}
                  className="w-full h-full object-cover filter blur-sm"
                />
                <div className="absolute left-3 top-3 bg-white/90 rounded-full p-2 shadow-md">
                  <svg
                    className="w-4 h-4 text-indigo-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 1C8.1 1 5 4.1 5 8v3H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2h-1V8c0-3.9-3.1-7-7-7zm1 14h-2v-2h2v2zm1-7H10V8c0-1.7 1.3-3 3-3s3 1.3 3 3v0z" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {a.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2">{a.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryAlbums;
