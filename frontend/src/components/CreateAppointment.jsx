import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AppointmentList({ refresh }) {
  const [appointments, setAppointments] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ name: '', date: '', reason: '' });

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/appointments')
      .then(res => setAppointments(res.data));
  }, [refresh]);

  const handleDelete = async id => {
    await axios.delete(`http://127.0.0.1:5000/appointments/${id}`);
    setAppointments(appointments.filter(a => a.id !== id));
  };

  const handleEdit = appt => {
    setEditing(appt.id);
    setEditData({ name: appt.name, date: appt.date, reason: appt.reason });
  };

  const handleUpdate = async id => {
    await axios.put(`http://127.0.0.1:5000/appointments/${id}`, editData);
    setEditing(null);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Appointments</h3>
      {appointments.map(appt => (
        <div key={appt.id} className="mb-4 p-4 bg-white shadow rounded">
          {editing === appt.id ? (
            <>
              <input className="mb-2 w-full border p-2" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} />
              <input type="date" className="mb-2 w-full border p-2" value={editData.date} onChange={e => setEditData({ ...editData, date: e.target.value })} />
              <textarea className="mb-2 w-full border p-2" value={editData.reason} onChange={e => setEditData({ ...editData, reason: e.target.value })} />
              <button onClick={() => handleUpdate(appt.id)} className="text-sm bg-green-500 text-white px-3 py-1 rounded mr-2">Update</button>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200 relative">
  <div className="flex justify-between items-start mb-2">
    <p className="text-lg font-bold text-gray-800">
      {appt.name} - <span className="font-normal text-gray-600">{appt.date}</span>
    </p>
    <div className="flex gap-2">
      <button
        onClick={() => handleEdit(appt)}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded shadow"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(appt.id)}
        className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1 px-3 rounded shadow"
      >
        Delete
      </button>
    </div>
  </div>
  <hr className="my-2 border-gray-300" />
  <p className="text-sm font-semibold text-gray-700 mt-2">Details:</p>

  <p className="text-base text-gray-700">{appt.reason}</p>
</div>

          )}
        </div>
      ))}
    </div>
  );
}

export default AppointmentList;
