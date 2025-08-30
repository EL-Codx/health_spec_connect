import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PatientNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Health Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="patient-navbar" />
        <Navbar.Collapse id="patient-navbar">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/appointments">Appointments</Nav.Link>
            <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
            <Nav.Link as={Link} to="/records">Medical Records</Nav.Link>
            <Nav.Link as={Link} to="/payments">Payments</Nav.Link>
            <Nav.Link as={Link} to="/reports">Reports & Feedback</Nav.Link>
            <Nav.Link as={Link} to="/notifications">Notifications</Nav.Link>
            <Nav.Link as={Link} to="/support">Support</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
