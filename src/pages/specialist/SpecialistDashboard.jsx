import React from "react";
import DashboardCard from "../../components/shared/DashbboardCard";
import { Table } from "react-bootstrap";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Mon", consultations: 2 },
  { name: "Tue", consultations: 4 },
  { name: "Wed", consultations: 3 },
  { name: "Thu", consultations: 5 },
  { name: "Fri", consultations: 1 },
];

const SpecialistDashboard = () => {
  return (
    <div>
      <h2 className="mb-4">Welcome Back, Dr. Mensah</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <DashboardCard title="Total Appointments" value="24" icon="calendar" />
        </div>
        <div className="col-md-4">
          <DashboardCard title="Pending Appointments" value="6" icon="clock" />
        </div>
        <div className="col-md-4">
          <DashboardCard title="Completed Consultations" value="18" icon="check-circle" />
        </div>
      </div>

      <h5>Consultation Trends This Week</h5>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="consultations" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h5 className="mt-5">Recent Appointments</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kwame Owusu</td>
            <td>2025-07-26</td>
            <td>10:00 AM</td>
            <td>Completed</td>
          </tr>
          <tr>
            <td>Akosua Mensimah</td>
            <td>2025-07-27</td>
            <td>02:00 PM</td>
            <td>Pending</td>
          </tr>
          <tr>
            <td>Yaw Adu</td>
            <td>2025-07-28</td>
            <td>11:30 AM</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default SpecialistDashboard;
