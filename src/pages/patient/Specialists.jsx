import React, { useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";

const specialists = [
  {
    id: 1,
    name: "Dr. Ama Mensah",
    specialty: "Cardiologist",
    description: "Expert in heart health and cardiovascular diseases.",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Dr. Kwame Boateng",
    specialty: "Dermatologist",
    description: "Specialist in skin, hair, and nail conditions.",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Dr. Efua Agyeman",
    specialty: "Neurologist",
    description: "Focuses on brain and nervous system disorders.",
    image: "https://via.placeholder.com/150"
  }
];

const Specialists = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

  const handleBookClick = (specialist) => {
    setSelectedSpecialist(specialist);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, send appointment booking to backend
    alert(`Appointment booked with ${selectedSpecialist.name}!`);
    setShowModal(false);
  };

  return (
    <div>
      <h3 className="mb-4 fw-bold text-primary">Available Specialists</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {specialists.map((spec) => (
          <Col key={spec.id}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={spec.image}
                alt={spec.name}
                className="p-3 rounded-circle"
                style={{ width: "120px", height: "120px", objectFit: "cover", margin: "0 auto" }}
              />
              <Card.Body className="text-center">
                <Card.Title>{spec.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{spec.specialty}</Card.Subtitle>
                <Card.Text>{spec.description}</Card.Text>
                <Button variant="primary" onClick={() => handleBookClick(spec)}>
                  Book Appointment
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Booking Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSpecialist && (
            <>
              <p>
                Booking with <strong>{selectedSpecialist.name}</strong> (
                {selectedSpecialist.specialty})
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Reason for appointment" />
                </Form.Group>
                <div className="d-grid">
                  <Button type="submit" variant="success">
                    Confirm Booking
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Specialists;
