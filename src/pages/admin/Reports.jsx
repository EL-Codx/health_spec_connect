import React, { useState } from 'react';
import { Card, Row, Col, Button, Table, Form } from 'react-bootstrap';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CSVLink } from 'react-csv';

const dummyAppointments = [
  { name: 'Jan', Appointments: 40 },
  { name: 'Feb', Appointments: 30 },
  { name: 'Mar', Appointments: 45 },
  { name: 'Apr', Appointments: 60 },
  { name: 'May', Appointments: 75 },
];

const dummyRegistrations = [
  { name: 'Week 1', Patients: 10, Specialists: 2 },
  { name: 'Week 2', Patients: 15, Specialists: 3 },
  { name: 'Week 3', Patients: 12, Specialists: 1 },
  { name: 'Week 4', Patients: 20, Specialists: 4 },
];

const commonReasons = [
  { reason: 'Fever', count: 12 },
  { reason: 'Checkup', count: 9 },
  { reason: 'Malaria', count: 7 },
  { reason: 'Headache', count: 6 },
  { reason: 'Covid-19', count: 4 },
];

const headers = [
  { label: 'Reason', key: 'reason' },
  { label: 'Count', key: 'count' },
];

const Reports = () => {
  const [filter, setFilter] = useState('');

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Common Appointment Reasons', 10, 10);
    autoTable(doc, {
      startY: 20,
      head: [['Reason', 'Count']],
      body: commonReasons.map(row => [row.reason, row.count]),
    });
    doc.save('report.pdf');
  };

  return (
    <div>
      <h4 className="mb-4">Reports & Analytics</h4>

      {/* Filters */}
      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Control 
              type="text" 
              placeholder="Search/filter..." 
              value={filter} 
              onChange={e => setFilter(e.target.value)} 
            />
          </Col>
        </Row>
      </Form>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={4}><Card className="p-3"><h6>Total Appointments</h6><h3>250</h3></Card></Col>
        <Col md={4}><Card className="p-3"><h6>Registered Patients</h6><h3>120</h3></Card></Col>
        <Col md={4}><Card className="p-3"><h6>Registered Specialists</h6><h3>45</h3></Card></Col>
      </Row>

      {/* Charts */}
      <Card className="p-3 mb-4">
        <h5>Monthly Appointment Trends</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyAppointments}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" /><YAxis /><Tooltip /><Legend />
            <Line type="monotone" dataKey="Appointments" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-3 mb-4">
        <h5>User Registrations (Weekly)</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dummyRegistrations}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" /><YAxis /><Tooltip /><Legend />
            <Bar dataKey="Patients" fill="#82ca9d" />
            <Bar dataKey="Specialists" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Common Appointment Reasons Table */}
      <Card className="p-3 mb-4">
        <h5>Top 5 Common Appointment Reasons</h5>
        <Table striped bordered hover>
          <thead>
            <tr><th>#</th><th>Reason</th><th>Count</th></tr>
          </thead>
          <tbody>
            {commonReasons.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.reason}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Export Buttons */}
      <div className="d-flex justify-content-end gap-2">
        <CSVLink data={commonReasons} headers={headers} filename="report.csv" className="btn btn-outline-success">
          Export CSV
        </CSVLink>
        <Button variant="outline-danger" onClick={exportPDF}>Export PDF</Button>
      </div>
    </div>
  );
};

export default Reports;
