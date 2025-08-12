// src/components/shared/Navbar.jsx
import React from 'react';
import { Navbar as BSNavbar, Container } from 'react-bootstrap';
import NotificationBell from './NotificationBell';
import UserAvatar from './UserAvatar';

const Navbar = () => {
  const dummyUser = { avatar: null };

  return (
    <BSNavbar bg="light" className="shadow-sm">
      <Container fluid className="justify-content-between">
        <BSNavbar.Brand>HealthSpecConnect</BSNavbar.Brand>
        <div className="d-flex align-items-center">
          <NotificationBell count={3} />
          <UserAvatar user={dummyUser} />
        </div>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
