import { Container, Table, Button } from "react-bootstrap";

export default function PatientPayments() {
  return (
    <Container>
      <h4 className="mb-4">Payments</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Service</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-08-20</td>
            <td>Consultation</td>
            <td>$50</td>
            <td>Paid</td>
            <td><Button size="sm">Download</Button></td>
          </tr>
        </tbody>
      </Table>
      <Button variant="success">Make Payment</Button>
    </Container>
  );
}
