import { Container, Button, Table, Modal, Form } from "react-bootstrap";
import { useState } from "react";

export default function PatientAppointments() {
  const [show, setShow] = useState(false);

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
          <tr>
            <td>2025-08-28</td>
            <td>10:00 AM</td>
            <td>Dr. Smith</td>
            <td>Upcoming</td>
            <td><Button size="sm" variant="danger">Cancel</Button></td>
          </tr>
        </tbody>
      </Table>

    </Container>
  );
}
