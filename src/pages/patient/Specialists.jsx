import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";


const Specialists = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [specialists, setSpecialists] = useState([])
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    reason: "",
  });


  // Fetch users on component load
  useEffect(() => {
    fetchSpecialists();
  }, []);


  const fetchSpecialists = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/users/specialists");
    const data = await res.json();
    // console.log(data)
    setSpecialists(data);
    // console.log(data)
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
    setAppointmentData({ date: "", time: "", reason: "" });
  };


  // Appointment creation
  const handleSubmit = async (e) => {
  e.preventDefault();

  const retrieved = localStorage.getItem("user");
  const user = JSON.parse(retrieved)
  const token = localStorage.getItem("token");

  const newAppointment = {
    specialist: selectedSpecialist._id,  
    patient: user._id,                  
    date: appointmentData.date,
    time: appointmentData.time,
    reason: appointmentData.reason,         
  };
  
  
    try {
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


  const formatImageUrl = (path) => {
  if (!path) return null;

  // Check if "uploads" exists
  let idx = path.indexOf("uploads");
  if (idx === -1) {
    // No uploads in string
    return null;
  }

  // Extract from uploads onward
  let relativePath = path.substring(idx);

  // Replace backslashes with forward slashes
  relativePath = relativePath.replace(/\\/g, "/");

  return `http://localhost:5000/${relativePath}`;
}



  return (
    <div>
      {/* {newAppointment.specialist} */}
      <h3 className="mb-4 fw-bold text-primary">Available Specialists</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {specialists.map((spec) => (
          <Col key={spec._id }>
            <Card className="h-100 shadow-sm border-0">
              {spec.image && formatImageUrl(spec.image) ? (
              <Card.Img
                variant="top"
                src={formatImageUrl(spec.image)}
                alt={spec.name}
                className="p-3 rounded-circle"
                style={{ width: "120px", height: "120px", objectFit: "cover", margin: "0 auto" }}
              />
               ) : (
                <PersonCircle size={60} color="gray" className="mx-auto d-block"/>
              )}
              
              <Card.Body className="text-center">
                <Card.Title>{spec.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Specialization: {spec.specialization}</Card.Subtitle>
                <Card.Text>Lisence: {spec.licenseNumber}</Card.Text>
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
                Booking with <strong>{selectedSpecialist.name}</strong>
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
                  <Form.Label>Reasons</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Reason for appointment"
                    value={appointmentData.reason}
                    onChange={e => setAppointmentData({ ...appointmentData, reason: e.target.value })}
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
