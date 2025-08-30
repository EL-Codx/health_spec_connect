import React, { useState } from "react";
import { Card, Button, Form, InputGroup, ListGroup } from "react-bootstrap";

const PatientChat = () => {
  const [patients] = useState([
    { id: 1, name: "John Doe", lastMessage: "See you tomorrow!" },
    { id: 2, name: "Jane Smith", lastMessage: "Can we reschedule?" },
  ]);

  const [activeChat, setActiveChat] = useState(patients[0]);
  const [messages, setMessages] = useState([
    { sender: "patient", text: "Hello doctor!" },
    { sender: "specialist", text: "Hello, how are you feeling today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: "specialist", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Chat Window */}
        <div className="col-md-9">
          <Card className="shadow-sm mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span className="fw-semibold">{activeChat?.name}</span>
              <div>
                <Button variant="success" size="sm" className="me-2">
                  📹 Start Video Call
                </Button>
                <Button variant="outline-primary" size="sm">
                  📅 Schedule Call
                </Button>
              </div>
            </Card.Header>
            <Card.Body style={{ height: "400px", overflowY: "auto" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-2 d-flex ${
                    msg.sender === "specialist" ? "justify-content-end" : "justify-content-start"
                  }`}
                >
                  <span
                    className={`px-3 py-2 rounded ${
                      msg.sender === "specialist"
                        ? "bg-primary text-white"
                        : "bg-light text-dark"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </Card.Body>
            <Card.Footer>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button variant="primary" onClick={sendMessage}>
                  Send
                </Button>
              </InputGroup>
            </Card.Footer>
          </Card>
        </div>

        {/* Patient Chat List */}
        <div className="col-md-3">
          <Card className="shadow-sm">
            <Card.Header className="fw-semibold">Patients</Card.Header>
            <ListGroup variant="flush">
              {patients.map((p) => (
                <ListGroup.Item
                  key={p.id}
                  action
                  active={activeChat?.id === p.id}
                  onClick={() => setActiveChat(p)}
                >
                  <div className="fw-bold">{p.name}</div>
                  <small className="text-muted">{p.lastMessage}</small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientChat;
