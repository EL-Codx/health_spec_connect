// src/pages/patients/PatientLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

const PatientLayout = () => {
  return (
    <>
      {/* Top Navigation Bar */}
      <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/patient" className="fw-bold text-primary">
            HealthSpecCon
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/patient/appointments">Appointments</Nav.Link>
              <Nav.Link as={Link} to="/patient/consultation">Consultation</Nav.Link>
              <Nav.Link as={Link} to="/patient/reports">Reports</Nav.Link>
              {/* <Nav.Link as={Link} to="/patient/chat">Chat</Nav.Link> */}

              <Dropdown align="end" className="ms-3">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  <i className="bi bi-person-circle"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/patient/profile">My Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/patient/settings">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page Content */}
      <Container fluid className="px-4">
        <Outlet />
      </Container>
    </>
  );
};

export default PatientLayout;
