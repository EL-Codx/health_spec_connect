import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { Search } from "lucide-react";


const SpecialistPatients = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    {
      id: "P001",
      firstName: "John",
      lastName: "Doe",
      otherNames: "Michael",
      dob: "1990-05-15",
      location: "Accra",
      lastVisit: "2025-08-01",
    },
    {
      id: "P002",
      firstName: "Sarah",
      lastName: "Smith",
      otherNames: "Ann",
      dob: "1985-02-10",
      location: "Kumasi",
      lastVisit: "2025-07-28",
    },
  ];

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Specialist Patients List", 14, 10);
    autoTable(doc, {
      head: [["Patient ID", "First Name", "Last Name", "Other Names", "DOB", "Location", "Last Visit"]],
      body: patients.map(p => [p.id, p.firstName, p.lastName, p.otherNames, p.dob, p.location, p.lastVisit]),
    });
    doc.save("patients.pdf");
  };

  const headers = [
    { label: "Patient ID", key: "id" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Other Names", key: "otherNames" },
    { label: "Date of Birth", key: "dob" },
    { label: "Location", key: "location" },
    { label: "Last Visit", key: "lastVisit" },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>My Patients</h3>
        <div>
          <Button variant="success" className="me-2" onClick={exportPDF}>Export PDF</Button>
          <CSVLink data={patients} headers={headers} filename="patients.csv" className="btn btn-primary">
            Export CSV
          </CSVLink>
        </div>
      </div>

      <Form className="mb-3">
        <div className="d-flex">
          <Form.Control type="text" placeholder="Search patients..." className="me-2" />
          <Button variant="secondary"><Search size={18} /></Button>
        </div>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Other Names</th>
            <th>Date of Birth</th>
            <th>Location</th>
            <th>Last Visit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, idx) => (
            <tr key={idx}>
              <td>{patient.id}</td>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.otherNames}</td>
              <td>{patient.dob}</td>
              <td>{patient.location}</td>
              <td>{patient.lastVisit}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => { setSelectedPatient(patient); setShowModal(true); }}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Patient Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPatient && (
            <div>
              <p><strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName} {selectedPatient.otherNames}</p>
              <p><strong>Date of Birth:</strong> {selectedPatient.dob}</p>
              <p><strong>Location:</strong> {selectedPatient.location}</p>
              <p><strong>Last Visit:</strong> {selectedPatient.lastVisit}</p>
              <hr />
              <h5>Medical History</h5>
              <p>[Medical history data will go here]</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SpecialistPatients;
