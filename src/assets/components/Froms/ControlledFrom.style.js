import styled from "styled-components";

export const SForm = styled.form`
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  flex-direction: column;
  /* backdrop-filter: blur(25px); */
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  @media (min-width: 786px) {
    padding: 3rem;
  }
`;
export const SInput = styled.input`
  color: white;
  width: 100%;
  background-color: transparent;
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 0.25rem;
  font-size: 0.75rem;
  border: 1px solid white;
  &:focus {
    outline: none;
    border: 1px solid green;
  }
  transition: all 300ms ease-in-out;
  @media (min-width: 786px) {
    max-width: 40vw;
  }
`;

export const STextArea = styled.textarea`
  color: white;
  width: 100%;
  background-color: transparent;
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 0.5rem;
  font-size: 0.75rem;
  border: 1px solid white;
  min-height: 100px;
  &:focus {
    outline: none;
    border: 1px solid green;
  }
  transition: all 300ms ease-in-out;
  @media (min-width: 786px) {
    max-width: 40vw;
  }
`;

export const SFormTitle = styled.span`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;
export const SFormControl = styled.div`
  :first-of-type {
    margin-top: 1rem;
  }
  :not(:last-of-type) {
    margin-bottom: 0.5rem;
  }
  display: grid;
  gap: 0.25em;
`;
export const SLable = styled.label`
  color: white;
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 4px;
  margin-bottom: calc(0.25em / 4);
`;
export const SButton = styled.button`
  background-color: transparent;
  backdrop-filter: blur(10px);
  border: 1px solid white;
  color: white;
  width: 100%;
  margin: 0.25rem auto;
  margin-top: 1rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  padding: 0.25rem;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #fff;
    color: black;
  }
  transition: all 300ms ease-in-out;
  @media (min-width: 786px) {
    max-width: 40vw;
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2em 0 0 0;
  gap: 0.5em;
  font-size: 1rem;
  justify-content: center;
  & button {
    font-size: ${({ fontsize }) => fontsize};
    min-width: 8em;
    width: auto;
    &:nth-of-type(2n-1) {
      color: black;
      background-color: white;
      &:hover {
        color: white;
        background-color: black;
        background: transparent;
        backdrop-filter: blur(10px);
      }
    }
  }
`;

export const STime = styled.time``;
