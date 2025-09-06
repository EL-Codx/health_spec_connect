import React, { useEffect, useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
// import AppointmentForm from './AppointmentForm';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  // fetch appointments
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/appointments", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(Array.isArray(data) ? data : []);
        // console.log(data);
      })
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Appointments</h4>
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Specialist</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, idx) => (
            <tr key={appt._id}>
              {console.log(appt)}
              <td>{idx + 1}</td>
              <td>{appt.patient ? appt.patient.name : <span className="text-muted">N/A</span>}</td>
              <td>{appt.specialist ? appt.specialist.name : <span className="text-muted">N/A</span>}</td>
              <td>{appt.date}</td>
              <td>{appt.time}</td>
              <td>
                <Badge bg={
                  appt.status.toLowerCase() === 'pending' ? 'warning' :
                  appt.status.toLowerCase() === 'approved' ? 'success' :
                  appt.status.toLowerCase() === 'cancelled' ? 'danger' :
                  'secondary'
                }>
                  {appt.status.toLowerCase()}
                </Badge>
              </td>
              <td>{appt.reason}</td>
              <td>
                <Button size="sm" variant="primary" className="me-2">View Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </div>
  );
};

export default Appointments;
