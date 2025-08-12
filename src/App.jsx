// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/shared/DashboardLayout';
import DashboardHome from './pages/admin/DashboardHome';
import Users from './pages/admin/Users';
import Specialist from './pages/admin/Specialist';
import Patients from './pages/admin/Patient';
import Appointments from './pages/admin/Appointments';
import Reports from './pages/admin/Reports';
import Profile from './pages/Profile';
import SpecialistLayout from './pages/patient/SpecialistLayout';
import SpecialistDashboard from './pages/patient/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path='' element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="specialists" element={<Specialist />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/specialist" element={<SpecialistLayout />}>
          <Route index element={<SpecialistDashboard />} />
          {/* <Route path="appointments" element={<SpecialistAppointments />} /> */}
          {/* <Route path="patients" element={<SpecialistPatients />} /> */}
          {/* <Route path="profile" element={<SpecialistProfile />} /> */}
          {/* <Route path="reports" element={<SpecialistReports />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
