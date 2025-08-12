import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ size = "md", message = "Loading..." }) => {
  const sizeMap = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg',
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" role="status" className={sizeMap[size]}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {message && <div className="mt-2">{message}</div>}
    </div>
  );
};

export default LoadingSpinner;
