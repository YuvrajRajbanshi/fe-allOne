import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/userStore";
import axios from "axios";
import toast from "react-hot-toast";

interface ProfileStats {
  albums: number;
  photos: number;
}

interface ProfileData {
  user: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    isVerified: boolean;
    createdAt: string;
  };
  stats: ProfileStats;
}

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  const apiURL =
    import.meta.env.MODE === "development"
      ? "http://localhost:8888"
      : "https://be-allone.onrender.com";

  useEffect(() => {
    fetchProfileData();
  }, [user.userId]);

  const fetchProfileData = async () => {
    if (!user.userId) return;

    try {
      setIsLoading(true);
      const response = await axios.get(`${apiURL}/api/profile/${user.userId}`);
      setProfileData(response.data);
      setEditName(response.data.user.name);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateName = async () => {
    if (!editName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      await axios.put(`${apiURL}/api/profile/${user.userId}`, {
        name: editName,
      });
      toast.success("Name updated successfully");
      setIsEditingName(false);
      fetchProfileData();
    } catch (error) {
      console.error("Error updating name:", error);
      toast.error("Failed to update name");
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const uploadRes = await axios.post(
        `${apiURL}/api/images/upload`,
        formData
      );
      const avatarUrl = uploadRes.data.url;

      await axios.put(`${apiURL}/api/profile/${user.userId}`, {
        name: profileData?.user.name,
        avatar: avatarUrl,
      });

      toast.success("Avatar updated successfully");
      fetchProfileData();
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Your Profile</h1>
          <p className="text-gray-500 mt-1">
            Manage your account settings and personal information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 ring-4 ring-gray-50">
                  {profileData?.user.avatar ? (
                    <img
                      src={profileData.user.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                      <span className="text-3xl font-semibold text-white">
                        {profileData?.user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </div>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  </div>
                )}
              </div>
              <label className="mt-3 text-purple-600 text-sm font-medium cursor-pointer hover:text-purple-700 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                Change
              </label>
            </div>

            {/* Form Section */}
            <div className="flex-1 space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full name
                </label>
                {isEditingName ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-800"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdateName}
                        className="flex-1 px-4 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingName(false);
                          setEditName(profileData?.user.name || "");
                        }}
                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setIsEditingName(true)}
                    className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {profileData?.user.name || "Add your name"}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm sm:text-base truncate">
                    {profileData?.user.email}
                  </div>
                  {profileData?.user.isVerified ? (
                    <span className="self-start sm:self-auto px-3 py-1.5 bg-green-50 text-green-600 text-xs font-medium rounded-lg whitespace-nowrap">
                      Verified
                    </span>
                  ) : (
                    <button className="self-start sm:self-auto px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
                      Verify
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {profileData?.stats.albums || 0}
                </p>
                <p className="text-sm text-purple-500 mt-0.5">Albums</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-pink-600">
                  {profileData?.stats.photos || 0}
                </p>
                <p className="text-sm text-pink-500 mt-0.5">Photos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Security</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">
                  Change Password
                </span>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-red-600"
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
                </div>
                <span className="font-medium text-red-600">Delete Account</span>
              </div>
              <svg
                className="w-5 h-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
