import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';

const SpecialistForm = ({ onSubmit, show, onHide }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    otherNames: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    licenseNumber: '',
    specialization: '',
    location: '',
    homeAddress: '',
    work: '',
    workAddress: '',
    guardianName: '',
    guardianContact: '',
    guardianAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, status: 'Pending', dateRegistered: new Date().toISOString(), lastVisited: null });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Register New Specialist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={4}><Form.Group><Form.Label>First Name</Form.Label><Form.Control name="firstName" onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group><Form.Label>Last Name</Form.Label><Form.Control name="lastName" onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group><Form.Label>Other Names</Form.Label><Form.Control name="otherNames" onChange={handleChange} /></Form.Group></Col>
          </Row>

          <Row className="mt-3">
            <Col md={4}><Form.Group><Form.Label>Date of Birth</Form.Label><Form.Control type="date" name="dateOfBirth" onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group><Form.Label>Email</Form.Label><Form.Control name="email" onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group><Form.Label>Phone</Form.Label><Form.Control name="phone" onChange={handleChange} /></Form.Group></Col>
          </Row>

          <Row className="mt-3">
            <Col md={4}><Form.Group><Form.Label>License Number</Form.Label><Form.Control name="licenseNumber" onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group><Form.Label>Specialization</Form.Label><Form.Control name="specialization" onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group><Form.Label>Location</Form.Label><Form.Control name="location" onChange={handleChange} /></Form.Group></Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}><Form.Group><Form.Label>Home Address</Form.Label><Form.Control name="homeAddress" onChange={handleChange} /></Form.Group></Col>
            <Col md={6}><Form.Group><Form.Label>Work Address</Form.Label><Form.Control name="workAddress" onChange={handleChange} /></Form.Group></Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}><Form.Group><Form.Label>Workplace</Form.Label><Form.Control name="work" onChange={handleChange} /></Form.Group></Col>
          </Row>

          <hr className="my-4" />
          <h6>Guardian Information</h6>

          <Row>
            <Col md={4}><Form.Group><Form.Label>Guardian Name</Form.Label><Form.Control name="guardianName" onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group><Form.Label>Guardian Contact</Form.Label><Form.Control name="guardianContact" onChange={handleChange} /></Form.Group></Col>
            <Col md={4}><Form.Group><Form.Label>Guardian Address</Form.Label><Form.Control name="guardianAddress" onChange={handleChange} /></Form.Group></Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Register</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SpecialistForm;
