import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Billing() {
  const [billings, setBillings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    amount: "",
    image: ""
  });
  const [searchName, setSearchName] = useState("");

  const fetchBillings = async () => {
    const res = await axios.get("http://localhost:5000/api/billings", {
      params: { name: searchName }
    });
    setBillings(res.data);
  };

  useEffect(() => {
    fetchBillings();
  }, [searchName]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/billings/${id}`);
    fetchBillings();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image: reader.result });
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/billings", formData);
    setShowModal(false);
    setFormData({ name: "", date: "", amount: "", image: "" });
    fetchBillings();
  };

  return (
    <div className="p-6">
      {/* Search and Add Button Row */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2 lg:w-1/3"
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow w-full sm:w-auto"
        >
          + Add Billing
        </button>
      </div>

      {/* Billing Cards */}
      {billings.map((b) => (
        <div key={b.id} className="border rounded-xl p-4 mb-3 shadow-sm">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">{b.name}</h3>
            <button
              onClick={() => handleDelete(b.id)}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
          <p>Date: {b.date}</p>
          <p>Amount: ₹{b.amount}</p>
          <img src={b.image} alt="bill" className="w-32 mt-2" />
        </div>
      ))}

      {/* Modal for Adding Billing Entry */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 z-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-xl w-96"
          >
            <h2 className="text-xl font-semibold mb-4">New Billing</h2>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mb-2"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
