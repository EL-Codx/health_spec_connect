import React, { useState, useEffect } from "react";
import { FaSearch, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaFilePdf, FaFileCsv } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

const SpecialistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // Get specialist ID from localStorage (user object)
  const user = JSON.parse(localStorage.getItem("user"));
  const specialistId = user?._id;

  // fetch appointments for the logged-in specialist
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!specialistId) return;
    fetch(`http://localhost:5000/api/appointments/specialist/${specialistId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching appointments:", err));
  }, [specialistId]);

  useEffect(() => {
    setFilteredAppointments(
      appointments.filter(app =>
        (app.patient?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.status || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, appointments]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Specialist Appointments", 14, 10);
    autoTable(doc, {
      head: [["ID", "Patient", "Date", "Status"]],
      body: filteredAppointments.map(app => [
        app._id,
        app.patient?.name || "N/A",
        app.date,
        app.status || "Pending"
      ]),
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
            data={filteredAppointments.map(app => ({
              ID: app._id,
              Patient: app.patient?.name || "N/A",
              Date: app.date,
              Status: app.status || "Pending"
            }))}
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
            filteredAppointments.map((app, indx )=> (
              <tr key={app._id}>
                <td>{indx + 1}</td>
                <td>{app.patient?.name || "N/A"}</td>
                <td>{app.date}</td>
                <td>
                  {app.status.toLowerCase() === "completed" && <span className="badge bg-success">{app.status}</span>}
                  {app.status.toLowerCase() === "pending" && <span className="badge bg-warning">{app.status}</span>}
                  {app.status.toLowerCase() === "upcoming" && <span className="badge bg-primary">{app.status}</span>}
                  {!app.status && <span className="badge bg-secondary">Pending</span>}
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