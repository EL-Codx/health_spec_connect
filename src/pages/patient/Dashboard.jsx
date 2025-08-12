import React from "react";
import DashboardCard from "../../components/shared/DashbboardCard";
import { Table } from "react-bootstrap";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { FaCalendarAlt, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";

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
                <DashboardCard
                label="Total Appointments"
                count="24"
                icon={<FaCalendarAlt size={25} />}
                bg="warning"
                />
            </div>
            <div className="col-md-4">
                <DashboardCard
                label="Pending Appointments"
                count="6"
                icon={<FaHourglassHalf size={25} />}
                bg="primary"
                />
            </div>
            <div className="col-md-4">
                <DashboardCard
                label="Completed Consultations"
                count="18"
                icon={<FaCheckCircle size={25} />}
                bg="success"
                />
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
