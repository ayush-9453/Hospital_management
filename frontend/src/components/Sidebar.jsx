import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaUserMd, FaFileInvoiceDollar, FaClipboardList, FaComments } from 'react-icons/fa';
import { TbReportSearch } from "react-icons/tb";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-gray-100 h-screen p-4 shadow-md transition-all duration-300 ${collapsed ? 'w-15' : 'w-60'}`}>
      <button
        className="text-gray-600 mb-6"
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaBars size={20} />
      </button>
      <div className="border-t border-gray-300 mb-4"></div>

      <ul className="space-y-6">
        <li>
          <Link to="/home/dashboard" className="flex items-center space-x-2 hover:text-blue-600">
            <FaHome />
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/home/appointments" className="flex items-center space-x-2 hover:text-blue-600">
            <FaClipboardList />
            {!collapsed && <span>Appointments</span>}
          </Link>
        </li>
        <li>
          <Link to="/home/doctors" className="flex items-center space-x-2 hover:text-blue-600">
            <FaUserMd />
            {!collapsed && <span>Doctors</span>}
          </Link>
        </li>
        <li>
          <Link to="/home/billing" className="flex items-center space-x-2 hover:text-blue-600">
            <FaFileInvoiceDollar />
            {!collapsed && <span>Billing</span>}
          </Link>
        </li>
        <li>
          <Link to="/home/reports" className="flex items-center space-x-2 hover:text-blue-600">
            <TbReportSearch />
            {!collapsed && <span>Reports</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
