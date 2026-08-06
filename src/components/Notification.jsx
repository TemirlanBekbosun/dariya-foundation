"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  className: "toastify-toast",
  bodyClassName: "toastify-body",
};

const toastContent = (message, type) => (
  <div className="toast-content">
    <strong>{type === "success" ? "Спасибо!" : "Ошибка"}</strong>
    <p>{message}</p>
  </div>
);

export const notify = {
  success: (message) =>
    toast.success(toastContent(message, "success"), toastOptions),
  error: (message) => toast.error(toastContent(message, "error"), toastOptions),
  info: (message) => toast.info(toastContent(message, "info"), toastOptions),
  warning: (message) =>
    toast.warning(toastContent(message, "warning"), toastOptions),
};

export default function Notification() {
  return <ToastContainer />;
}
