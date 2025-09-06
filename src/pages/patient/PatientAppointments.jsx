import { Container, Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const patientId = user?._id;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/appointments?patient=${patientId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        setAppointments([]);
      }
    };
    if (patientId) fetchAppointments();
  }, [patientId]);

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>My Appointments</h4>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Specialist</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.specialist ? appt.specialist.name : "N/A"}</td>
                <td>{appt.status || "Pending"}</td>
                <td>
                  <Button size="sm" variant="danger">Cancel</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No appointments found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}