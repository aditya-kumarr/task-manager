// import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";
import TaskState from "./contexts/taskState";
import ToastState from "./Toast/ToastContext";
import MobileNav from "./MainComponents/mobileNav";
import Router from "./Router";
import Toaster from "./Toast/Toaster";
import ModalState from "./components/Modal/ModalContext";
import ModalRenderer from "./components/Modal/ModalRenderer";
function App() {
  return (
    <TaskState>
      <AuthProvider>
        <ToastState>
          <ModalState>
            <div className="app">
              <MobileNav />
              <Router />
            </div>
            <Toaster />
            <ModalRenderer />
          </ModalState>
        </ToastState>
      </AuthProvider>
    </TaskState>
  );
}

export default App;
