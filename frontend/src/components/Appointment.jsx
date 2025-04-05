import React, { useState } from 'react';
import CreateAppointment from './CreateAppointment';
import ShowAppointments from './ShowAppointment';
import { FaPlus, FaList } from 'react-icons/fa';

function AppointmentDashboard() {
  const [view, setView] = useState('create');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Appointment Dashboard</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView('create')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            view === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          <FaPlus /> Create Appointment
        </button>
        <button
          onClick={() => setView('show')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            view === 'show' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          <FaList /> Show Appointments
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {view === 'create' ? <ShowAppointments /> : <CreateAppointment/>}
      </div>
    </div>
  );
}

export default AppointmentDashboard;
