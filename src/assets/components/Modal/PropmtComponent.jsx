import React, { useState } from "react";
import styled from "styled-components";
import { ButtonGroup, SButton } from "../Froms/ControlledFrom.style";
// Add a state to check whether the state should return true or false

const PropmtComponent = ({ title, onPrompt, options }) => {
  return (
    <>
      <SubHeading>{title}</SubHeading>
      <ButtonGroup fontsize="1rem">
        <SButton onClick={() => onPrompt(true)}>{options.yes}</SButton>
        <SButton onClick={() => onPrompt(false)}>{options.no}</SButton>
      </ButtonGroup>
    </>
  );
};

const SubHeading = styled.h2`
  font-size: 1.1rem;
`;

export default PropmtComponent;
