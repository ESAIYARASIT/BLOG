import { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "../components/ToastContainer";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = "success", message = "", duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).slice(2, 9);
    const toast = { id, type, message, duration };
    setToasts((t) => [toast, ...t]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const value = { toasts, addToast, removeToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export default ToastContext;
