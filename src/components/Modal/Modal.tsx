import React from "react";
import "./modalStyle.css";

export default function Modal({
  show,
  title,
  children,
  onClose,
}: {
  show: boolean;
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
}) {
  if (!show) {
    return null;
  }

  return (
    <div className="container-modal">
      <h2>{title}</h2>
      <div className="modal-content">{children}</div>
      <div className="modal-footer">
        <button className="modal-button" onClick={onClose}>
          close
        </button>
      </div>
    </div>
  );
}
