import React, { useContext, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ToastContext } from "./ToastContext";
import Toast from "./Toast";

const Toaster = () => {
  const { show, priority, position, message, toastDispatch } =
    useContext(ToastContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      toastDispatch({ type: "HIDE" });
    }, 5000);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <Toast
          position={position}
          type={priority}
          closeToast={() => toastDispatch({ type: "HIDE" })}
          children={message}
        />
      )}
    </AnimatePresence>
  );
};

export default Toaster;
