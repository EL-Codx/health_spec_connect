import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';

const activities = [
  "John Doe registered",
  "Dr. Mary assigned to Patient #102",
  "New appointment created by Jane",
];

const RecentActivities = () => {
  return (
    <Card>
      <Card.Header>Recent Activities</Card.Header>
      <ListGroup variant="flush">
        {activities.map((activity, index) => (
          <ListGroup.Item key={index}>{activity}</ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default RecentActivities;
