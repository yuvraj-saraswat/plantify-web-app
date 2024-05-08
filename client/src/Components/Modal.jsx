import React from 'react'

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

  return (
    <div>
      <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
    </div>
  )
}

export default Modal;
