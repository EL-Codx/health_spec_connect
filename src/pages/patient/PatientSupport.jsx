import { Container, Accordion, Form, Button } from "react-bootstrap";

export default function PatientSupport() {
  return (
    <Container>
      <h4 className="mb-4">Support</h4>

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>How do I book an appointment?</Accordion.Header>
          <Accordion.Body>You can book from the appointments tab.</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How do I pay?</Accordion.Header>
          <Accordion.Body>Payments can be made online with a card.</Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h5 className="mt-4">Contact Support</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button>Send</Button>
      </Form>
    </Container>
  );
}
