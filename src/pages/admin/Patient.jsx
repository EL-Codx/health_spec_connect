import React, { useState } from 'react';
import { Table, Button, InputGroup, Form } from 'react-bootstrap';

const Patients = () => {
    const [specialists, setSpecialists] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddSpecialist = (newSpecialist) => {
        const specialistWithMeta = {
            ...newSpecialist,
            id: Date.now(),
            dateRegistered: new Date(),
            lastVisited: null,
            status: 'Pending',
        };
        setSpecialists([...specialists, specialistWithMeta]);
        setShowAddModal(false);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Health Specialists</h4>
            </div>

            <InputGroup className="mb-3" style={{ maxWidth: '400px' }}>
                <Form.Control
                    placeholder="Search by name..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>

            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>DOB</th>
                        <th>Location</th>
                        <th>Home Address</th>
                        <th>Guardian Name</th>
                        <th>Guardian Contact</th>
                        <th>Guardian Address</th>
                        <th>Date Registered</th>
                        <th>Last Visited</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {specialists.map((s, idx) => (
                        <tr key={s.id}>
                            <td>{idx + 1}</td>
                            <td>{`${s.firstName} ${s.lastName} ${s.otherNames || ''}`}</td>
                            <td>{s.dateOfBirth}</td>
                            <td>{s.location}</td>
                            <td>{s.homeAddress}</td>
                            <td>{s.work}</td>
                            <td>{s.workAddress}</td>
                            <td>{s.guardianName}</td>
                            <td>{s.guardianContact}</td>
                            <td>{s.guardianAddress}</td>
                            <td>{new Date(s.dateRegistered).toLocaleDateString()}</td>
                            <td>{s.lastVisited ? new Date(s.lastVisited).toLocaleDateString() : 'N/A'}</td>
                            <td>{s.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Patients;
