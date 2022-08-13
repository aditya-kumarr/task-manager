import styled from "styled-components";

export const StyledClock = styled.div`
  display: flex;
  margin: 0.5rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 15em;
  height: 15em;
  border-radius: 50%;
  /* border: 3px solid hsl(30, 78%, 54%); */
  box-shadow: 6px 6px 10px -1px rgba(0,0,0,0.15),
              -6px -6px 10px -1px rgba(255,255,255,0.15);
  &::after {
      content: "" ;
      position: absolute;
      border-radius:50%;
      width: 13em;
      height: 13em;
      box-shadow: inset 4px 4px 6px -1px rgba(0,0,0,0.15),
      inset -4px -4px 6px -1px rgba(255,255,255,0.15),
      -0.5px -0.5px 0px rgba(0,0,0,0.15),
      0px 12px 10px rgba(0,0,0,0.15);
  }
`;
