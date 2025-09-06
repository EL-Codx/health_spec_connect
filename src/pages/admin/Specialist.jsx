import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button, Form, InputGroup, Modal } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  // Modal State for Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = (user) => {
    setCurrentUser(user);
    setForm({ name: user.name, email: user.email, role: user.role });
    setShowEditModal(true);
  };

  // Fetch users on component load
  useEffect(() => {
    fetchSpecialists();
  }, []);


  const fetchSpecialists = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/users/specialists");
    const data = await res.json();
    setUsers(data);
  } catch (err) {
    console.error("Error fetching specialists:", err);
  }
};

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  // Update user
  const handleUpdate = async () => {
    if (!currentUser) return;
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${currentUser._id}`, form);
      if (res.status === 200) {
        alert("User updated successfully");
        fetchSpecialists();
        handleEditClose();
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Error updating user. Check console.");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      alert("User deleted successfully");
      fetchSpecialists(); // Refresh list
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user. Check console.");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Manage Users</h3>
        {/* <Button variant="primary" onClick={handleShow}>Add User</Button> */}
      </div>

      <InputGroup className="mb-3" style={{ maxWidth: '400px' }}>
        <Form.Control
          placeholder="Search by name..."
        />
      </InputGroup>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
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
                <td>
                  <Button
                    variant="success"
                    size="sm"
                  >
                    Approve
                  </Button>
                  {/* <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditShow(user)}
                  >
                    Edit
                  </Button> */}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user._id || index)}
                  >
                    Deny
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>


      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Update User</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
