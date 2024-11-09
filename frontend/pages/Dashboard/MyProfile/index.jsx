import { useState, useEffect } from "react";
import { message } from "antd";
import Axios from "axios";
import { useRouter } from "next/router";
import Sidebar from "@/components/sidebar/Sidebar";

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Axios.get("http://localhost:5000/api/profile", {
          withCredentials: true,
        });
        setProfileData(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      } catch (error) {
        message.error(error.response?.data.msg || "Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put(
        "http://localhost:5000/api/profile",
        { firstName, lastName },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setProfileData(response.data);
        setEditMode(false);
        message.success("Profile updated successfully");
      }
    } catch (error) {
      message.error(error.response?.data.msg || "Failed to update profile");
    }
  };

  const handleLogout = async () => {
    message.destroy();
    try {
      const response = await Axios.post(
        "http://localhost:5000/api/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        message.success("Logged out successfully");
        router.push("/#home");
      }
    } catch (error) {
      message.error("Failed to log out. Please try again.");
    }
  };

  const handleCancel = () => {
    setFirstName(profileData.firstName);
    setLastName(profileData.lastName);
    setEditMode(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        {profileData ? (
          <div className="max-w-lg  mx-auto shadow-md rounded-lg p-6 relative mt-[70px]">
            <button
              onClick={toggleEditMode}
              className="absolute top-2 right-3 px-3 py-1 rounded hover:bg-mlue hover:text-tahiti transition"
            >
              Edit
            </button>
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">First Name:</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Last Name:</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className=" text-dark text-[13px] hover:bg-mlue hover:text-tahiti px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-dark p-2 text-[13px] rounded-lg hover:bg-red hover:text-tahiti transition"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">First Name:</span>{" "}
                  {profileData.firstName}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Last Name:</span>{" "}
                  {profileData.lastName}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Email:</span>{" "}
                  {profileData.email}
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="absolute bottom-[25px] right-5 px-4 py-2 rounded-lg hover:bg-red hover:text-tahiti transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
