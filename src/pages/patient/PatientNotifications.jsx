import { Container, ListGroup, Button } from "react-bootstrap";

export default function PatientNotifications() {
  return (
    <Container>
      <h4 className="mb-4">Notifications</h4>
      <ListGroup>
        <ListGroup.Item>📅 Appointment reminder: Aug 28</ListGroup.Item>
        <ListGroup.Item>💊 New prescription available</ListGroup.Item>
        <ListGroup.Item>📢 System update completed</ListGroup.Item>
      </ListGroup>
      <Button className="mt-3">Mark all as read</Button>
    </Container>
  );
}
