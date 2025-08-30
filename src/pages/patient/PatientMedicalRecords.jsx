import { Container, Card, Row, Col, Button } from "react-bootstrap";

export default function PatientMedicalRecords() {
  return (
    <Container>
      <h4 className="mb-4">My Medical Records</h4>
      <Row>
        <Col md={4}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Prescriptions</Card.Title>
              <Card.Text>View your medication prescriptions.</Card.Text>
              <Button>Download</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Lab Reports</Card.Title>
              <Card.Text>Check your lab test results.</Card.Text>
              <Button>Download</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Consultation History</Card.Title>
              <Card.Text>View past consultations.</Card.Text>
              <Button>Download</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
