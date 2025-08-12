import React from 'react';
import { Badge } from 'react-bootstrap';
import { BellFill } from 'react-bootstrap-icons';

const NotificationBell = ({ count = 0 }) => {
  return (
    <div className="position-relative me-3" style={{ cursor: 'pointer' }}>
      <BellFill size={20} />
      {count > 0 && (
        <Badge
          bg="danger"
          pill
          className="position-absolute top-0 start-100 translate-middle"
        >
          {count}
        </Badge>
      )}
    </div>
  );
};

export default NotificationBell;
