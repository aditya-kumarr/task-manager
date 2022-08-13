import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";
import taskContext from "../../../contexts/TaskContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { FormComponent } from "../../../components/Modal/FormComponent";
import { ModalContext } from "../../../components/Modal/ModalContext";
import { ToastContext } from "../../../Toast/ToastContext";
import PropmtComponent from "../../../components/Modal/PropmtComponent";

const messageFormatter = (message = "") => {
  return message.slice(10, -1);
};

const AuthIcon = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const { modalDispatch } = useContext(ModalContext);
  const { toastDispatch } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(taskContext);

  const { signup, signin } = useAuth();

  const signUpHandler = async (data) => {
    try {
      await signup(data["email"], data["password"]);
      modalDispatch({ type: "HIDE" });
    } catch (e) {
      toastDispatch({
        type: "SHOW",
        message: messageFormatter(e.message),
        priority: "error",
        position: "top",
      });
    }
  };

  const signInHandler = async (data) => {
    try {
      await signin(data["email"], data["password"]);
      modalDispatch({ type: "HIDE" });
    } catch (e) {
      toastDispatch({
        type: "SHOW",
        message: messageFormatter(e.message),
        priority: "error",
        position: "top",
      });
    }
  };

  const logOutHandler = () => {
    modalDispatch({
      type: "SHOW",
      message: (
        <PropmtComponent
          title={"You sure you wanna log out ?"}
          options={{ yes: "Logout", no: "Cancel" }}
          onPrompt={(res) => {
            if (res) {
              signOut(auth);
              location.reload();
              console.log("logged out");
            }
            modalDispatch({ type: "HIDE" });
          }}
        />
      ),
      heading: "Logout ?",
    });
  };

  const openSignUpModal = () => {
    modalDispatch({
      type: "SHOW",
      message: (
        <FormComponent
          buttonName="test button"
          formArr={[
            {
              label: "Email",
              name: "email",
              type: "email",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
            },
          ]}
          formTitle="Does it work"
          heading="Heading"
          onSubmitAction={signUpHandler}
        />
      ),
    });
    setOpenDropDown(false);
  };
  const openSignInModal = () => {
    modalDispatch({
      type: "SHOW",
      message: (
        <FormComponent
          buttonName="test button"
          formArr={[
            {
              label: "Email",
              name: "email",
              type: "email",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
            },
          ]}
          formTitle="Does it work"
          heading="Heading"
          onSubmitAction={signInHandler}
        />
      ),
      heading: "Is this working ?",
    });
    setOpenDropDown(false);
  };

  return (
    <>
      <SAuthIcon onClick={() => setOpenDropDown((state) => !state)}>
        <DropDown>
          <FaUser />
          <DropDownMenu
            openDropDown={openDropDown}
            onClick={(e) => e.stopPropagation()}
          >
            {currentUser && currentUser.email}
            <hr />

            {!currentUser && (
              <button onClick={openSignUpModal}>Sign Up </button>
            )}
            {!currentUser && (
              <button onClick={openSignInModal}>Sign In </button>
            )}
            {currentUser && <button onClick={logOutHandler}>Log Out </button>}
          </DropDownMenu>
        </DropDown>
      </SAuthIcon>
    </>
  );
};

const DropDown = styled.div`
  position: relative;
`;

const DropDownMenu = styled.div`
  position: absolute;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  min-width: 250px;
  right: 20px;
  font-size: 1rem;
  padding: 0.5em;
  top: calc(100% + 0.5rem);
  border-radius: 0.5rem;
  background-color: transparent;
  backdrop-filter: blur(10px);
  border: 1px solid white;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  pointer-events: none;
  transform: translateY(-10px);
  opacity: 0;
  ${({ openDropDown }) =>
    openDropDown &&
    `
    opacity:1;
    transform:translateY(0);
    pointer-events: auto;
  `}

  /* pointer-events: auto; */
  & input {
    /* border-radius: 0.5rem; */
    cursor: pointer;
    pointer-events: auto;
    border-bottom: 1px solid white;
    color: white;
    background-color: transparent;
    &:focus {
      outline: none;
      border-bottom: 1px solid green;
    }
  }
  & button {
    border: 1px solid white;
    padding: 0.25rem;
    border-radius: 1rem;
    min-width: 90px;
    &:hover {
      background-color: white;
      color: black;
    }
  }
`;

const SAuthIcon = styled.div`
  color: black;
  position: fixed;
  cursor: pointer;
  z-index: 10;
  font-size: 1.5rem;
  top: 20px;
  right: 20px;
  padding: 0.25em;
  border-radius: 50%;
  background-color: white;
  /* background-color: red; */
`;

const SBreak = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  & h4 {
    /* width: 100%; */
    text-align: center;
    flex-shrink: 0;
  }
`;

const LineBreak = styled.span`
  display: inline-block;
  height: 1px;
  /* flex-shrink:1; */
  width: 100%;
  background-color: white;
`;

export default AuthIcon;
