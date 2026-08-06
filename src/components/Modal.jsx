"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { notify } from "./Notification";
import emailjs from "@emailjs/browser";

export default function Modal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);

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

  const resetForm = () => {
    setName("");
    setPhone("");
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      notify.error("Пожалуйста, заполните имя и телефон.");
      return;
    }

    setPending(true);

    try {
      await emailjs.send(
        "service_t1gv5gn",
        "template_9rw178l",
        {
          name,
          phone,
          time: new Date().toLocaleString(),
        },
        "jOjrRbdE5sE2CUK2z",
      );

      notify.success(
        "Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.",
      );
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      notify.error("Ошибка при отправке. Попробуйте ещё раз позже.");
    } finally {
      setPending(false);
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

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
        <form className="modal-form" onSubmit={handleSend}>
          <label>Имя</label>
          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Телефон</label>
          <input
            type="tel"
            placeholder="+996 (706) 123-456"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`btn btn--primary btn--full ${pending ? "btn--loading" : ""}`}
            disabled={pending}
          >
            {pending ? (
              <>
                <span className="btn__spinner" aria-hidden="true" />
                Отправка...
              </>
            ) : (
              "Отправить"
            )}
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
