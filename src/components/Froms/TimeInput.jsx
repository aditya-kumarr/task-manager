import React from "react";
import styled from "styled-components";
import { SLable } from "./ControlledFrom.style";

const TimeInput = ({ handleInputs, timeData }) => {
  return (
    <>
      <TimeLable>
        <div>
          <SLable>Due Hours</SLable>
          <input
            name="hours"
            onChange={(e) => handleInputs(e)}
            value={timeData.hours}
            placeholder="Hour"
            type="number"
          />
        </div>
        <div>
          <SLable>Due Minutes</SLable>
          <input
            name="mins"
            onChange={(e) => handleInputs(e)}
            value={timeData.mins}
            placeholder="Min"
            type="number"
          />
        </div>
      </TimeLable>
    </>
  );
};

export default TimeInput;

const TimeLable = styled.div`
  font-size: 0.75rem;
  display: flex;
  color: white;
  gap: 0.5rem;
  justify-content: space-around;
  align-items: center;
  border-radius: 1rem;
  & input {
    color: white;
    background-color: transparent;
    border: 1px solid white;

    backdrop-filter: blur(10px);
    width: 100%;
    padding: 0.25rem;
    border-radius: 0.5rem;
    &:focus {
      outline: none;
    }
  }
`;
