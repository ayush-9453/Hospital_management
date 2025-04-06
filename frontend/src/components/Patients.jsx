import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    diseases: "",
    image: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/patients");
      setPatients(res.data);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddPatient = async () => {
    const { name, age, gender, phone, email } = formData;
    if (!name || !age || !gender || !phone || !email) return alert("Fill required fields");

    try {
      const res = await axios.post("http://localhost:5000/patients", formData);
      setPatients([...patients, res.data]);
      setFormData({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        diseases: "",
        image: "",
      });
    } catch (err) {
      console.error("Failed to add patient:", err);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/patients/${id}`);
      setPatients(patients.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete patient:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Patient Management</h1>

      {/* Patient Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" />
        <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="p-2 border rounded" />
        <select name="gender" value={formData.gender} onChange={handleChange} className="p-2 border rounded">
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="p-2 border rounded" />
        <input name="diseases" value={formData.diseases} onChange={handleChange} placeholder="Diseases" className="p-2 border rounded" />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border rounded" />
        <button onClick={handleAddPatient} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded col-span-1 md:col-span-4">
          Add Patient
        </button>
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {patients.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-md p-4 relative">
            <button
              onClick={() => handleDeletePatient(p.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              ❌
            </button>
            <img
              src={p.image?.startsWith("data:image") ? p.image : "/man.png"}
              alt={p.name}
              className="w-full h-70 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{p.name}</h2>
            <p><strong>Age:</strong> {p.age}</p>
            <p><strong>Gender:</strong> {p.gender}</p>
            <p><strong>Phone:</strong> {p.phone}</p>
            <p><strong>Email:</strong> {p.email}</p>
            <p><strong>Address:</strong> {p.address}</p>
            <p><strong>Diseases:</strong> {p.diseases}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsPage;
