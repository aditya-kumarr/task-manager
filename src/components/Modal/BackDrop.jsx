import React from "react";
import { FaCut } from "react-icons/fa";
import styled from "styled-components";
import { motion } from "framer-motion";

const Backdrop = ({ children, onCloseClick, Heading }) => {
  return (
    <SBackDrop
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>{Heading}</h1>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCloseClick();
        }}
      >
        +
      </button>
      {children}
    </SBackDrop>
  );
};

const SBackDrop = styled(motion.div)`
  color:white;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000e9;
  & > button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2rem;
    transform: rotateZ(45deg);
  }
  & > h1 {
    text-align: center;
    font-size: 1.5rem;
    position: absolute;
    top: 100px;
    font-weight: 600;
  }
`;

export default Backdrop;
