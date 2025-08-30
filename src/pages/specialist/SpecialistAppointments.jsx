import React, { useState, useEffect } from "react";
import { FaSearch, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaFilePdf, FaFileCsv } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

const SpecialistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    // Fetch from backend
    setAppointments([
      { id: 1, patient: "John Doe", date: "2025-08-15", status: "Pending" },
      { id: 2, patient: "Jane Smith", date: "2025-08-14", status: "Completed" },
      { id: 3, patient: "Michael Lee", date: "2025-08-17", status: "Upcoming" },
    ]);
  }, []);

  useEffect(() => {
    setFilteredAppointments(
      appointments.filter(app =>
        app.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, appointments]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Specialist Appointments", 14, 10);
    autoTable(doc, {
      head: [["ID", "Patient", "Date", "Status"]],
      body: filteredAppointments.map(app => [app.id, app.patient, app.date, app.status]),
    });
    doc.save("appointments.pdf");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Specialist Appointments</h3>

      {/* Search & Export */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <button className="btn btn-danger me-2" onClick={exportPDF}>
            <FaFilePdf /> PDF
          </button>
          <CSVLink
            data={filteredAppointments}
            filename="appointments.csv"
            className="btn btn-success"
          >
            <FaFileCsv /> CSV
          </CSVLink>
        </div>
      </div>

      {/* Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(app => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.patient}</td>
                <td>{app.date}</td>
                <td>
                  {app.status === "Completed" && <span className="badge bg-success">{app.status}</span>}
                  {app.status === "Pending" && <span className="badge bg-warning">{app.status}</span>}
                  {app.status === "Upcoming" && <span className="badge bg-primary">{app.status}</span>}
                </td>
                <td className="text-center">
                  {app.status !== "Completed" && (
                    <button className="btn btn-sm btn-success me-2">
                      <FaCheckCircle /> Complete
                    </button>
                  )}
                  <button className="btn btn-sm btn-danger">
                    <FaTimesCircle /> Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No appointments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SpecialistAppointments;
