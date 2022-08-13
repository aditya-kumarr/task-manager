import React, { useContext, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ModalContext } from "./ModalContext";
import Backdrop from "./BackDrop";
import useKey from "../../hooks/useKey";

const ModalRenderer = () => {
  const { show, heading, message, modalDispatch } = useContext(ModalContext);

  useKey("Escape",(_=>modalDispatch({type:"HIDE"})))


  return (
    <AnimatePresence>
      {show && (
        <Backdrop
          children={message}
          Heading={heading}
          onCloseClick={() => {
            modalDispatch({ type: "HIDE" });
          }}
        ></Backdrop>
      )}
    </AnimatePresence>
  );
};

export default ModalRenderer;
