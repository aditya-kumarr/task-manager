import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ListofText } from "./ListofText";
const Popup = ({ children, onPressClose }) => {
  return (
    <>
      <ListContainer
        initial={{ x: "100vh", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
      >
        <CrossBtn onClick={onPressClose} >+</CrossBtn>
        {children}
      </ListContainer>
    </>
  );
};

const ListContainer = styled(motion.section)`
  position: fixed;
  right: 0;
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  padding-top: 1rem;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  flex-direction: column;
  backdrop-filter: blur(25px);
  width: 80vw;
  border-radius: 1rem;
  @media (min-width: 786px) {
    padding: 3rem;
    /* width: 40vw; */
    padding-left: 5rem;
  }
`;

const CrossBtn = styled.button`
  position: absolute;
  top: -12px;
  right: 0px;
  font-size: 2rem;
  transform: rotateZ(45deg);
`;

export default Popup;
