import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardCard = ({ label, count, bg, icon }) => {
  return (
    <Card bg={bg} text="white" className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div className="fs-2">{icon}</div>

          <div className="text-end">
            <Card.Title className="mb-0">{label}</Card.Title>
            <Card.Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {count}
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DashboardCard;
