import { Container, Card, Button, Form } from "react-bootstrap";

export default function PatientReportsFeedback() {
  return (
    <Container>
      <h4 className="mb-4">Reports & Feedback</h4>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Consultation Report</Card.Title>
          <Card.Text>Report generated on 2025-08-20 by Dr. Smith</Card.Text>
          <Button>Download</Button>
        </Card.Body>
      </Card>

      <h5>Give Feedback</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Rate your experience</Form.Label>
          <Form.Select>
            <option>⭐⭐⭐⭐⭐ Excellent</option>
            <option>⭐⭐⭐⭐ Good</option>
            <option>⭐⭐⭐ Average</option>
            <option>⭐⭐ Poor</option>
            <option>⭐ Very Bad</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Comments</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary">Submit</Button>
      </Form>
    </Container>
  );
}
