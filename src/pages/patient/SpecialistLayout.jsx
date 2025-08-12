import Sidebar from "../../components/shared/Sidebar";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { Outlet } from "react-router-dom";

const SpecialistLayout = () => {
    const specialist_menu = [
    { path: "/specialist", name: "Dashboard" },
    { path: "/specialist/appointments", name: "Appointments" },
    { path: "/specialist/patients", name: "My Patients" },
    { path: "/specialist/profile", name: "Profile" },
    { path: "/specialist/reports", name: "Reports" },
  ];

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar menu={specialist_menu}/>
        <main className="p-4 w-100 bg-white">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SpecialistLayout;
