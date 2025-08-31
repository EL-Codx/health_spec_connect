import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";


const Specialists = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [specialists, setSpecialists] = useState([])
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    note: "",
  });


  // Fetch users on component load
  useEffect(() => {
    fetchSpecialists();
  }, []);


  const fetchSpecialists = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/users/specialists");
    const data = await res.json();
    setSpecialists(data);
    console.log(data)
  } catch (err) {
    console.error("Error fetching specialists:", err);
  }
};

  const handleBookClick = (specialist) => {
    setSelectedSpecialist(specialist);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setAppointmentData({ date: "", time: "", note: "" });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here, send appointment booking to backend
  //   alert(`Appointment booked with ${selectedSpecialist.name}!`);
  //   setShowModal(false);
  // };


  // Appointment creation
  const handleSubmit = async (e) => {
  e.preventDefault();

  const patientId = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  // const user = JSON.parse(localStorage.getItem("user"));
  // const patientId = user?._id;

  const newAppointment = {
    specialist: selectedSpecialist._id,  
    patient: patientId,                  
    date: appointmentData.date,
    time: appointmentData.time,
    reason: appointmentData.note,         
  };

  
    try {
      // const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newAppointment),
      });

      if (res.ok) {
        alert(`Appointment booked with ${selectedSpecialist.name}!`);
        handleClose();
      } else {
        const errData = await res.json();
        alert("Error: " + errData.message);
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("Booking failed!");
    }
  };

  return (
    <div>
      <h3 className="mb-4 fw-bold text-primary">Available Specialists</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {specialists.map((spec) => (
          <Col key={spec._id }>
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
                  <Form.Control
                    type="date"
                    required
                    value={appointmentData.date}
                    onChange={e => setAppointmentData({ ...appointmentData, date: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    required
                    value={appointmentData.time}
                    onChange={e => setAppointmentData({ ...appointmentData, time: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Reason for appointment"
                    value={appointmentData.note}
                    onChange={e => setAppointmentData({ ...appointmentData, note: e.target.value })}
                  />
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
