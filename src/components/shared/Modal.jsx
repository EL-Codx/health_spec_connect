import React from 'react';
import { Modal as BSModal, Button } from 'react-bootstrap';

const Modal = ({ show, title, children, onClose, onConfirm, confirmText = "Confirm" }) => {
  return (
    <BSModal show={show} onHide={onClose} centered>
      <BSModal.Header closeButton>
        <BSModal.Title>{title}</BSModal.Title>
      </BSModal.Header>
      <BSModal.Body>{children}</BSModal.Body>
      <BSModal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>{confirmText}</Button>
        )}
      </BSModal.Footer>
    </BSModal>
  );
};

export default Modal;
