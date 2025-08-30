import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Form, InputGroup, Modal } from 'react-bootstrap';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    // status: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // Fetch users on component load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // ✅ Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`User created! Temporary password: ${data.password}`);
        setForm({ name: "", email: "", role: "" });
        fetchUsers(); // refresh table
      } else {
        setMessage( data.error);
      }
    } catch (err) {
      setMessage("Error adding user");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      alert("User deleted successfully");
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user. Check console.");
    }
  };

  // console.log(user)


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Manage Users</h3>
        <Button variant="primary" onClick={handleShow}>Add User</Button>
      </div>

      <InputGroup className="mb-3" style={{ maxWidth: '400px' }}>
        <Form.Control
          placeholder="Search by name..."
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {/* <th>Status</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id || index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                {/* <td>{user.status}</td> */}
                <td>
                  <Button variant="warning" size="sm" className="me-2">Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(user._id || index)}>Delete</Button>
                </td>
                {/* {console.log(user._id)} */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add User Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={form.role} onChange={handleChange}>
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="support">Support</option>
              </Form.Select>
            </Form.Group>

            {/* <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={form.status} onChange={handleChange}>
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Add User</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
