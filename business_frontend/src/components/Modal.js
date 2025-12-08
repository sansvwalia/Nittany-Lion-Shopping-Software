import React, { useState } from "react";
import "../App.css"

export default function Modal({ show, onClose, children }) {
    if (!show) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                {children}
            </div>
        </div>
    );
}
