import React, { useState } from "react";
import styled from "styled-components";
import { SLable } from "./ControlledFrom.style";

const OptionInput = ({options=[],name,selected,handleChange}) => {



  return (
    <>
        <SLable>{name}</SLable>
        <Sselect required name={name} value={selected} onChange={(e)=>handleChange(e)}>
        <Soption value="" >---</Soption>
         {options.map(((item,index)=>(
            <Soption  name={item} value={item}  key={index}>{item}</Soption>
         )))}
        </Sselect>
    </>
  );
};

const Sselect = styled.select`
  font-size: 0.75rem;
  padding: 0.25rem;
  border-radius: 1rem;
  background-color: transparent;
  backdrop-filter: blur(10px);
  border: 1px solid white;
  &:focus {
    outline: none;
    border: 1px solid green;
  }
  transition: all 300ms ease-in-out;
  @media (min-width: 786px) {
    width: 40vw;
  }
`;

const Soption = styled.option`
  font-size: 0.75rem;
  color: black;
`

export default OptionInput;
