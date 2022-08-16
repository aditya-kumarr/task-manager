import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";

const Toast = ({ children, closeToast, type, position }) => {
  return (
    <SToastContainer position={position}>
      <SToast
        type={type}
        onClick={closeToast}
        initial={{ x: 0 }}
        animate={{ x: -260 }}
        exit={{ x: 0 }}
      >
        {children}
        <TimerStrip
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          // exit={{ scaleX: 0 }}
          transition={{ duration: 5 }}
        ></TimerStrip>
      </SToast>
    </SToastContainer>
  );
};

export default Toast;

export const SToastContainer = styled.div`
  z-index: 10000;
  color: white;
  position: fixed;
  /* pointer-events: none; */
  ${({ position }) => position}:0px;
  border: 1px solid red;
  right: -260px;
  margin: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SToast = styled(motion.div)`
  color: ${({ type }) => {
    switch (type) {
      case "warning":
        return "yellow";
      case "error":
        return "red";
      default:
        return "white";
    }
  }};

  width: 250px;
  position: relative;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid #fff;
  border-radius: 0.5em 0 0.5em 0.5em;
  transform: scaleX(1);
  cursor: pointer;
`;

const TimerStrip = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 5px;
  border-radius: 10rem;
  transform-origin: left;
  transform: scaleX(1);
  background: linear-gradient(45deg, #fff, #ff00ff);
  width: 245px;
`;
