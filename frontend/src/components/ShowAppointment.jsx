import React, { useState } from 'react';
import axios from 'axios';

function AppointmentForm({ onSuccess }) {
  const [formData, setFormData] = useState({ name: '', date: '', reason: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:5000/appointments', formData);
    setFormData({ name: '', date: '', reason: '' });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange}
        className="w-full p-2 border rounded" />
      <input type="date" name="date" value={formData.date} onChange={handleChange}
        className="w-full p-2 border rounded" />
      <textarea name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange}
        className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create</button>
    </form>
  );
}

export default AppointmentForm;
