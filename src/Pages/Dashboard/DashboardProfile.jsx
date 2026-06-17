import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const DashboardProfile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.fullName || user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      fullName: formData.name,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };
    
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData({
      name: user?.fullName || user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
          >
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <FaSave /> Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Full Name</label>
            <p className="text-gray-800 font-medium">{user?.fullName || user?.name}</p>
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email Address</label>
            <p className="text-gray-800 font-medium">{user?.email}</p>
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Phone Number</label>
            <p className="text-gray-800 font-medium">{user?.phone || "Not added"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProfile;