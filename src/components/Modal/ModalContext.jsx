import { createContext, useReducer, useContext } from "react";

export const ModalContext = createContext();

const reducer = (state, action) => {
  if (action.type == "SHOW") {
    return {
      ...state,
      message: action.message,
      heading: action.heading,
      show: true,
    };
  } else if (action.type === "HIDE") {
    return { ...state, show: false };
  }
};

const ModalState = ({ children }) => {
  const [modalState, modalDispatch] = useReducer(reducer, {
    heading: "",
    message: "",
    show: false,
  });

  return (
    <ModalContext.Provider
      value={{
        show: modalState.show,
        message: modalState.message,
        heading: modalState.heading,
        modalDispatch,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export default ModalState;
