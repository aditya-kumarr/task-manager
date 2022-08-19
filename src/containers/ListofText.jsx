import React from "react";
import styled from "styled-components";
import { SButton } from "../components/Froms/ControlledFrom.style";

// The main goal of this component is to show all the problems in a list  in small boxes
export function ListofText({
  title = "Note",
  list = ["this is a note", "this is another note", "this is also a note"],
  buttonPressHandler,
}) {
  return (
    <ListContainer>
      <h3>{title}</h3>
      {list.map((item, index) => {
        return (
          <p key={index}>
            {index + 1}. {item}
          </p>
        );
      })}
      <SButton onClick={buttonPressHandler}>Add</SButton>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 250px;
  padding-right: 0.5em;
  overflow-y: scroll;
  gap: 0.2em;
`;
