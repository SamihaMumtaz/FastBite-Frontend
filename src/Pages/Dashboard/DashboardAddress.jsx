import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTimes, FaPlus, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const DashboardAddress = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
  });
  const [editData, setEditData] = useState({
    address: "",
    city: "",
  });

  useEffect(() => {
    if (user) {
      if (user.addresses && user.addresses.length > 0) {
        setAddresses(user.addresses);
      } 
      else if (user.address && user.city) {
        setAddresses([{
          id: "default",
          address: user.address,
          city: user.city,
          isDefault: true
        }]);
      }
      setEditData({
        address: user?.address || "",
        city: user?.city || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    if (!editData.address || !editData.city) {
      toast.error("Please fill all fields");
      return;
    }

    const updatedAddresses = addresses.map(addr => 
      addr.isDefault ? { ...addr, address: editData.address, city: editData.city } : addr
    );
    
    const finalAddresses = updatedAddresses.length > 0 ? updatedAddresses : [{
      id: Date.now(),
      address: editData.address,
      city: editData.city,
      isDefault: true
    }];

    const updatedUser = {
      ...user,
      address: editData.address,
      city: editData.city,
      addresses: finalAddresses,
    };
    
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setAddresses(finalAddresses);
    setIsEditing(false);
    toast.success("Address updated successfully!");
  };

  const handleAddAddress = () => {
    if (!formData.address || !formData.city) {
      toast.error("Please fill all fields");
      return;
    }
    
    const newAddress = {
      id: Date.now(),
      address: formData.address,
      city: formData.city,
      isDefault: addresses.length === 0, 
    };
    
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    
    const updatedUser = {
      ...user,
      addresses: updatedAddresses,
      ...(addresses.length === 0 && {
        address: formData.address,
        city: formData.city,
      }),
    };
    
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsAdding(false);
    setFormData({ address: "", city: "" });
    toast.success("Address added successfully!");
  };

  const setDefaultAddress = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    
    const defaultAddr = updatedAddresses.find(addr => addr.id === id);
    
    const updatedUser = {
      ...user,
      addresses: updatedAddresses,
      address: defaultAddr.address,
      city: defaultAddr.city,
    };
    
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setAddresses(updatedAddresses);
    toast.success("Default address updated!");
  };

  const handleDeleteAddress = (id) => {
    if (addresses.length === 1) {
      toast.error("Cannot delete the only address. Add another address first.");
      return;
    }
    
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    
    const deletedAddr = addresses.find(addr => addr.id === id);
    if (deletedAddr?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
      const newDefault = updatedAddresses[0];
      
      const updatedUser = {
        ...user,
        addresses: updatedAddresses,
        address: newDefault.address,
        city: newDefault.city,
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setAddresses(updatedAddresses);
    } else {
      const updatedUser = {
        ...user,
        addresses: updatedAddresses,
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setAddresses(updatedAddresses);
    }
    
    toast.success("Address deleted successfully!");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Saved Addresses</h2>
        {!isEditing && !isAdding && (
          <div className="flex gap-2">
            {addresses.length > 0 && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
              >
                <FaEdit /> Edit Default
              </button>
            )}
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 text-green-500 hover:text-green-600"
            >
              <FaPlus /> Add New
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="bg-orange-50 p-3 rounded-lg mb-2">
            <p className="text-sm text-orange-600 font-medium">Editing Default Address</p>
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Address</label>
            <textarea
              name="address"
              value={editData.address}
              onChange={handleEditChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="House No, Street, Area, Landmark"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">City</label>
            <input
              type="text"
              name="city"
              value={editData.city}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter city"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveEdit}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <FaSave /> Save Changes
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditData({
                  address: user?.address || "",
                  city: user?.city || "",
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      ) : isAdding ? (
        <div className="space-y-4">
          <div className="bg-blue-50 p-3 rounded-lg mb-2">
            <p className="text-sm text-blue-600 font-medium">Add New Address</p>
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="House No, Street, Area, Landmark"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter city"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddAddress}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <FaPlus /> Add Address
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setFormData({ address: "", city: "" });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.length > 0 ? (
            addresses.map((addr) => (
              <div key={addr.id} className={`border rounded-lg p-4 relative ${addr.isDefault ? 'border-orange-300 bg-orange-50/30' : ''}`}>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className={`${addr.isDefault ? 'text-orange-500' : 'text-gray-400'} mt-1`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-800 font-medium">{addr.address}</p>
                      {addr.isDefault && (
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{addr.city}</p>
                  </div>
                  <div className="flex gap-2">
                    {!addr.isDefault && (
                      <>
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-blue-500 hover:text-blue-700 text-xs"
                        >
                          Set Default
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <FaMapMarkerAlt className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No saved addresses</p>
              <button
                onClick={() => setIsAdding(true)}
                className="text-orange-500 mt-2 hover:text-orange-600"
              >
                Add Address →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardAddress;