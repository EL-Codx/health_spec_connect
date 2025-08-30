import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

const UserAvatar = ({ user, size = 30, handleLogout }) => {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    objectFit: 'cover',
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" bsPrefix="p-0 border-0 bg-transparent">
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" style={avatarStyle} />
        ) : (
          <PersonCircle size={size} />
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu align="end">
        <Dropdown.Item href="/dashboard/profile">Profile</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={ handleLogout }>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserAvatar;
