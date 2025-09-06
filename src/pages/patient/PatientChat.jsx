import React, { useState, useEffect } from "react";
import { Card, Button, Form, InputGroup, ListGroup } from "react-bootstrap";

const PatientChat = () => {
  const [contacts, setContacts] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // console.log(user)

  // If user prop is not provided, get from localStorage
  // if (!user) {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     // const token = localStorage.getItem("token");
  //   } catch {
  //     user = null;
  //   }
  // }

  // Load contacts (patients or specialists depending on logged-in role)
  useEffect(() => {
    const fetchContacts = async () => {
      
      try {
        const res = await fetch(`http://localhost:5000/api/messages/contacts?userId=${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setContacts(data);
        if (data.length > 0) setActiveChat(data[0]);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };
    fetchContacts();
  }, [user]);

  // Load messages when chat changes
  useEffect(() => {
    if (!activeChat) return;

    const fetchMessages = async () => {
      try {
        const chatRoom =
          user.role === "patient"
            ? `${user._id}-${activeChat._id}`
            : `${activeChat._id}-${user._id}`;

        const res = await fetch(`http://localhost:5000/api/messages/${chatRoom}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [activeChat, user]);

  // Send new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const chatRoom =
        user.role === "patient"
          ? `${user._id}-${activeChat._id}`
          : `${activeChat._id}-${user._id}`;

      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          sender: user._id,
          receiver: activeChat._id,
          text: newMessage,
          chatRoom,
        }),
      });

      const savedMessage = await res.json();
      setMessages([...messages, savedMessage]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* {console.log(user)} */}
      <div className="row">
        {/* Chat Window */}
        <div className="col-md-9">
          <Card className="shadow-sm mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span className="fw-semibold">{activeChat?.name}</span>
            </Card.Header>

            <Card.Body style={{ height: "400px", overflowY: "auto" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-2 d-flex ${
                    msg.sender._id === user._id
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  <span
                    className={`px-3 py-2 rounded ${
                      msg.sender._id === user._id
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

        {/* Contact List */}
        <div className="col-md-3">
          <Card className="shadow-sm">
            <Card.Header className="fw-semibold">
              {user.role === "patient" ? "Specialists Booked" : "Patients Booked"}
            </Card.Header>
            <ListGroup variant="flush">
              {contacts.map((c) => (
                <ListGroup.Item
                  key={c._id}
                  action
                  active={activeChat?._id === c._id}
                  onClick={() => setActiveChat(c)}
                >
                  <div className="fw-bold">{c.name}</div>
                  <small className="text-muted">{c.email}</small>
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
