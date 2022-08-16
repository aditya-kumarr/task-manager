import { createContext, useReducer, useContext } from "react";

export const ToastContext = createContext();

const reducer = (state, action) => {
  if (action.type == "SHOW") {
    return {
      ...state,
      message: action.message,
      show: true,
      priority: action.priority ?? "",
      position: action.position ?? "top",
    };
  } else if (action.type === "HIDE") {
    return { ...state, show: false };
  } else {
    return state;
  }
};

export const useToast = () => {
  return useContext(ToastContext);
};

const ToastState = ({ children }) => {
  const [toastState, toastDispatch] = useReducer(reducer, {
    message: "",
    show: false,
    priority: "",
    position: "top",
  });

  return (
    <ToastContext.Provider
      value={{
        position: toastState.position,
        priority: toastState.priority,
        show: toastState.show,
        message: toastState.message,
        toastDispatch,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
export default ToastState;
