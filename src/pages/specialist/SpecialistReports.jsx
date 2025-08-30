import React, { useState } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SpecialistReports = () => {
  const [reports] = useState([
    {
      id: 1,
      patient: "John Doe",
      date: "2025-08-01",
      diagnosis: "Flu",
      prescription: "Paracetamol, Rest",
    },
    {
      id: 2,
      patient: "Jane Smith",
      date: "2025-08-10",
      diagnosis: "Diabetes Check",
      prescription: "Insulin adjustment",
    },
  ]);

  const chartData = [
    { name: "Flu", cases: 10 },
    { name: "Diabetes", cases: 5 },
    { name: "Hypertension", cases: 8 },
  ];

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4 text-primary fw-bold">📊 Specialist Reports</h2>

      {/* Analytics Chart */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="fw-semibold">Case Analytics</Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#0d6efd" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      {/* Reports Table */}
      <Card className="shadow-sm">
        <Card.Header className="fw-semibold">Consultation Records</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Diagnosis</th>
                <th>Prescription</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.patient}</td>
                  <td>{r.date}</td>
                  <td>{r.diagnosis}</td>
                  <td>{r.prescription}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" size="sm">
              Export CSV
            </Button>
            <Button variant="success" size="sm">
              Download PDF
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SpecialistReports;
