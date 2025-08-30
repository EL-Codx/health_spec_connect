// src/components/shared/Navbar.jsx
import React, { useContext } from 'react';
import { Navbar as BSNavbar, Container } from 'react-bootstrap';
import NotificationBell from './NotificationBell';
import UserAvatar from './UserAvatar';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/"); // redirect to login page
//   };

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dummyUser = { avatar: null };

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to login page
  };

  return (
    <BSNavbar bg="light" className="shadow-sm">
      <Container fluid className="justify-content-between">
        <BSNavbar.Brand>HealthSpecConnect</BSNavbar.Brand>
        <div className="d-flex align-items-center">
          <NotificationBell count={3} />
          <UserAvatar user={dummyUser} handleLogout={ handleLogout } />
        </div>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
