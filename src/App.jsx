import { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";
import TaskState from "./contexts/taskState";
import ToastState from "./Toast/ToastContext";
import MobileNav from "./MainComponents/mobileNav";
import Router from "./Router";
import Toaster from "./Toast/Toaster";
// import ModalState from "./Modal/ModalContext";
import ModalState from "./components/Modal/ModalContext";
import ModalRenderer from "./components/Modal/ModalRenderer";

function App() {
  return (
    <AuthProvider>
      <TaskState>
        <ModalState>
          <ToastState>
            <div className="app">
              <MobileNav />
              <Router />
            </div>
            <Toaster />
            <ModalRenderer />
          </ToastState>
        </ModalState>
      </TaskState>
    </AuthProvider>
  );
}

export default App;
