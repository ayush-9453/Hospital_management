import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    availability: "Available",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/doctors");
      setDoctors(res.data);
      setFilteredDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = async () => {
    const { name, specialization, phone, email } = formData;
    if (!name || !specialization || !phone || !email) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/doctors", formData);
      setDoctors([...doctors, res.data]);
      setFilteredDoctors([...doctors, res.data]);
      resetForm();
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding doctor:", err);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/doctors/${id}`);
      const updated = doctors.filter((doc) => doc.id !== id);
      setDoctors(updated);
      setFilteredDoctors(updated);
    } catch (err) {
      console.error("Error deleting doctor:", err);
    }
  };

  const handleEditDoctor = (doc) => {
    setEditingDoctor(doc);
    setFormData(doc);
    setShowEditModal(true);
  };

  const handleUpdateDoctor = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/doctors/${editingDoctor.id}`, formData);
      const updated = doctors.map((d) => (d.id === editingDoctor.id ? res.data : d));
      setDoctors(updated);
      setFilteredDoctors(updated);
      resetForm();
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating doctor:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      specialization: "",
      phone: "",
      email: "",
      availability: "Available",
    });
    setEditingDoctor(null);
  };

  const handleSearch = () => {
    const filtered = doctors.filter((doc) =>
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const totalDoctors = doctors.length;
  const availableDoctors = doctors.filter((d) => d.availability === "Available").length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-700 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Doctors</h2>
          <p className="text-3xl font-bold">{totalDoctors}</p>
        </div>
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Available Doctors</h2>
          <p className="text-3xl font-bold">{availableDoctors}</p>
        </div>
      </div>

      {/* Search & Add */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex gap-2 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by specialization"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <button onClick={handleSearch} className="bg-gray-600 text-white px-4 py-2 rounded">Search</button>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Add Doctor
        </button>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="bg-white p-4 rounded-xl shadow-md relative">
            <button
              onClick={() => handleDeleteDoctor(doc.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              ❌
            </button>
            <button
              onClick={() => handleEditDoctor(doc)}
              className="absolute top-2 left-2 text-blue-600 hover:text-blue-800"
            >
              ✏️
            </button>
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <h2 className="text-xl font-bold ">{doc.name}</h2>
            <p><strong>Specialization:</strong> {doc.specialization}</p>
            <p><strong>Email:</strong> {doc.email}</p>
            <p><strong>Phone:</strong> {doc.phone}</p>
            <p><strong>Status:</strong> {doc.availability}</p>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <DoctorModal
          title="Add Doctor"
          formData={formData}
          handleChange={handleChange}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddDoctor}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <DoctorModal
          title="Edit Doctor"
          formData={formData}
          handleChange={handleChange}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateDoctor}
        />
      )}
    </div>
  );
};

// Reusable Modal
const DoctorModal = ({ title, formData, handleChange, onClose, onSave }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded mb-2" />
      <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" className="w-full p-2 border rounded mb-2" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded mb-2" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded mb-2" />
      <select name="availability" value={formData.availability} onChange={handleChange} className="w-full p-2 border rounded mb-4">
        <option value="Available">Available</option>
        <option value="Busy">Busy</option>
      </select>
      <div className="flex justify-end gap-4">
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        <button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </div>
    </div>
  </div>
);

export default DoctorsPage;
