import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    availableDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalBills: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [doctorsRes, patientsRes, appointmentsRes, billsRes] = await Promise.all([
          axios.get("http://localhost:5000/doctors"),
          axios.get("http://localhost:5000/patients"),
          axios.get("http://localhost:5000/appointments"),
          axios.get("http://localhost:5000/api/billings"),
        ]);

        const totalDoctors = doctorsRes.data.length;
        const availableDoctors = doctorsRes.data.filter((d) => d.availability === "Available").length;

        setStats({
          totalDoctors,
          availableDoctors,
          totalPatients: patientsRes.data.length,
          totalAppointments: appointmentsRes.data.length,
          totalBills: billsRes.data.length,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  const statCard = (label, value, color) => (
    <div className={`p-4 rounded-xl shadow-md text-white ${color}`}>
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold mb-4">🏥 Hospital Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCard("Total Doctors", stats.totalDoctors, "bg-blue-300")}
        {statCard("Available Doctors", stats.availableDoctors, "bg-blue-400")}
        {statCard("Total Patients", stats.totalPatients, "bg-blue-500")}
        {statCard("Appointments", stats.totalAppointments, "bg-blue-600")}
        {statCard("Total Bills", stats.totalBills, "bg-blue-700")}
      </div>

      {/* Doctor Overview Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">👨‍⚕️ Doctors Overview</h2>
        <p className="text-gray-700">
          Easily monitor the total number of doctors, their availability status, and manage assignments based on specializations.
        </p>
      </div>

      {/* Patient History Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">🧑‍🤝‍🧑 Patients History & Records</h2>
        <p className="text-gray-700">
          Access patient history including previous visits, ongoing treatments, and medical background to ensure informed care.
        </p>
      </div>

      {/* Analytics Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">📈 Analytics & Insights</h2>
        <p className="text-gray-700 mb-4">
          Get real-time visual analytics of hospital operations like doctor availability, appointment trends, and billing data.
        </p>
        <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
          [📊 Chart/Analytics Placeholder – Integrate with Recharts or Chart.js]
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
