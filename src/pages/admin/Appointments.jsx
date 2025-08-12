import React, { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
// import AppointmentForm from './AppointmentForm';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
//   const [showForm, setShowForm] = useState(false);

  const handleCreate = (newAppt) => {
    setAppointments([
      ...appointments,
      { ...newAppt, id: Date.now(), createdAt: new Date(), status: 'Pending' },
    ]);
    setShowForm(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Appointments</h4>
        {/* <Button onClick={() => setShowForm(true)}>Create Appointment</Button> */}
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
            <tr key={appt.id}>
              <td>{idx + 1}</td>
              <td>{appt.patientName}</td>
              <td>{appt.specialistName || 'Unassigned'}</td>
              <td>{appt.date}</td>
              <td>{appt.time}</td>
              <td>
                <Badge bg={
                  appt.status === 'Pending' ? 'warning' :
                  appt.status === 'Approved' ? 'success' :
                  appt.status === 'Cancelled' ? 'danger' :
                  'secondary'
                }>
                  {appt.status}
                </Badge>
              </td>
              <td>{appt.reason}</td>
              <td>
                <Button size="sm" variant="success" className="me-2">Approve</Button>
                <Button size="sm" variant="danger">Reject</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <AppointmentForm show={showForm} onHide={() => setShowForm(false)} onSubmit={handleCreate} /> */}
    </div>
  );
};

export default Appointments;
