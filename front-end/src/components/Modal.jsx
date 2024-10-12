import React from 'react';
import './Modal.css'; // Add custom CSS for the modal

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Login Required</h3>
        <p>You need to log in to create a profile. Would you like to log in now?</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>Yes, take me to login</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;