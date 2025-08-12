import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const DashboardLayout = () => {
    const admin_menu = [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/dashboard/users', name: 'Users' },
    { path: '/dashboard/specialists', name: 'Specialists' },
    { path: '/dashboard/patients', name: 'Patients' },
    { path: '/dashboard/appointments', name: 'Appointments' },
    { path: '/dashboard/reports', name: 'Reports' },
    // { path: '/dashboard/profile', name: 'Profile' },
  ];

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar menu={admin_menu}/>
        <main className="p-4 w-100 bg-white">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
