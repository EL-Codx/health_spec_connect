import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

const Sidebar = ({menu}) => {

  return (
    <div className="bg-light vh-100 border-end p-3" style={{ width: '250px' }}>
      <ListGroup variant="flush">
        {menu.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-decoration-none text-dark d-block py-2 px-3 rounded mb-3 ${isActive ? 'bg-primary fw-bold' : ''}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </ListGroup>
    </div>
  );
};

export default Sidebar;
