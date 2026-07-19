"use client";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className="modal-overlay" onClick={handleBackgroundClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
        <h3>Обратный звонок</h3>
        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <label>Имя</label>
          <input type="text" placeholder="Ваше имя" required />
          <label>Телефон</label>
          <input type="tel" placeholder="+7 (900) 123-45-67" required />
          <button type="submit" className="btn btn--primary btn--full">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
