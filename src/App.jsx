// src/App.jsx
import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/shared/DashboardLayout';
import DashboardHome from './pages/admin/DashboardHome';
import Users from './pages/admin/Users';
import Specialist from './pages/admin/Specialist';
import Patients from './pages/admin/Patient';
import Appointments from './pages/admin/Appointments';
import Reports from './pages/admin/Reports';
import Profile from './pages/Profile';
import SpecialistLayout from './pages/specialist/SpecialistLayout';
import SpecialistDashboard from './pages/specialist/SpecialistDashboard';
import SpecialistAppointments from './pages/specialist/SpecialistAppointments';
import SpecialistPatients from './pages/specialist/SpecialistPatients';
import SpecialistReports from './pages/specialist/SpecialistReports';
import SpecialistChat from './pages/specialist/SpecialistChat';
import PatientLayout from './pages/patient/PatientLayout';
import PatientAppointments from './pages/patient/PatientAppointments';
import Specialists from './pages/patient/Specialists';
import PatientChat from './pages/patient/PatientChat';
import PatientReportsFeedback from './pages/patient/PatientReportsFeedback';
import LoginUI from './pages/auth/Login';
// import Profile from './pages/Profile'
import ProtectedRoute from './components/shared/ProtectedRoute';
import SpecialistRegister from "./pages/auth/SpecialistRegister";
import PatientRegister from "./pages/auth/PatientRegister";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* auths */}
        <Route path="/" element={<LoginUI />} />
        <Route path="/register/specialist" element={<SpecialistRegister />} />
        <Route path="/register/patient" element={<PatientRegister />} />

        {/* pages */}
        <Route path="/dashboard" element={<ProtectedRoute role="admin"><DashboardLayout /></ProtectedRoute>}>
          <Route path='' element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="specialists" element={<Specialist />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/specialist" element={<ProtectedRoute role="specialist"><SpecialistLayout /></ProtectedRoute>}>
          <Route index element={<SpecialistDashboard />} />
          <Route path="appointments" element={<SpecialistAppointments />} />
          <Route path="patients" element={<SpecialistPatients />} />
          <Route path="messages" element={<SpecialistChat />} />
          <Route path="reports" element={<SpecialistReports />} />
          {/* <Route path="profile" element={<Profile />} /> */}
        </Route>

        <Route path="/patient" element={<ProtectedRoute role="patient"><PatientLayout /></ProtectedRoute>}>
          <Route index element={<Specialists />} />
          <Route path='appointments' element={<PatientAppointments />} />
          <Route path="consultation" element={<PatientChat />} />
          <Route path="reports" element={<PatientReportsFeedback />} />
          {/* <Route path="messages" element={<SpecialistChat />} /> */}
          {/* <Route path="reports" element={<SpecialistReports />} /> */}
          {/* <Route path="profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
