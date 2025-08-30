import React, { useState } from "react";
import { Card, Button, Form, Alert, Spinner, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const res = await login(email, password);
    if (!res.ok) {
      setErr(res.message || "Invalid credentials");
      return;
    }

    // Redirect based on role
    const role = res.user.role;
    if (role === "admin") navigate("/admin-dashboard");
    else if (role === "specialist") navigate("/specialist-dashboard");
    else navigate("/patient-dashboard");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h3 className="mb-3 text-primary fw-bold text-center">Sign in</h3>
              {err && <Alert variant="danger">{err}</Alert>}
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" className="w-100" disabled={loading}>
                  {loading ? <Spinner size="sm" animation="border" /> : "Login"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
