import React, { useContext, useState } from "react";
import styled from "styled-components";
import taskContext from "../contexts/TaskContext";
import { ACTIONS } from "../contexts/taskState";
import { ToastContext } from "../Toast/ToastContext";
import { FormComponent } from "../components/Modal/FormComponent";
import { ModalContext } from "../components/Modal/ModalContext";

const ActiveTaskConatiner = () => {
  let { dispatch, activatedTask } = useContext(taskContext);
  let currentTask = activatedTask;

  // const [completed, setCompleted] = useState(false);
  let completed = false;
  let postponed = false;
  // const [postponed, setPosponed] = useState(false);
  const { toastDispatch } = useContext(ToastContext);
  const { modalDispatch } = useContext(ModalContext);
  const onProblemSubmitHandler = (data) => {
    modalDispatch({ type: "HIDE" });
    dispatch({
      type: ACTIONS.ADD_PROBLEM,
      payload: currentTask,
      problem: data["problem"],
    });
    if (postponed) {
      dispatch({
        type: ACTIONS.POSTPONE_TASK,
        payload: currentTask,
      });
      toastDispatch({ type: "SHOW", message: "Task Postponed" });
    }
  };
  const onNoteSubmitHandler = (data) => {
    modalDispatch({ type: "HIDE" });

    dispatch({
      type: ACTIONS.ADD_FEEDBACK,
      note: data["note"],
    });
    if (completed) {
      console.log("completed");
      dispatch({
        type: ACTIONS.COMPLETE_TASK,
        payload: activatedTask,
      });
      toastDispatch({ type: "SHOW", message: "Task Completed" });
    }
  };

  const completePressHandler = () => {
    completed = true;

    noteModalHandler();
  };
  const postponePressHandler = () => {
    postponed = true;
    problemModalHandler();
  };

  const problemModalHandler = () => {
    modalDispatch({
      type: "SHOW",
      message: (
        <FormComponent
          buttonName="Add"
          formArr={[
            {
              label: "Problem",
              name: "problem",
              type: "text",
            },
          ]}
          formTitle="Problem ?"
          onSubmitAction={onProblemSubmitHandler}
        />
      ),
      heading: "You have any problem",
    });
  };

  const noteModalHandler = () => {
    modalDispatch({
      type: "SHOW",
      message: (
        <FormComponent
          buttonName="Add"
          formArr={[
            {
              label: "Note",
              name: "note",
              type: "text",
            },
          ]}
          formTitle="Notes ?"
          onSubmitAction={onNoteSubmitHandler}
        />
      ),
      heading: "Wanna give some feedback",
    });
  };

  if (currentTask.id === "dummy")
    return (
      <>
        <ActiveTaskContainer>No task Activated</ActiveTaskContainer>
      </>
    );

  return (
    <>
      <ActiveTaskContainer>
        <h1>{currentTask.taskName}</h1>
        <Description>{currentTask.taskDescription}</Description>
        <div>
          {currentTask.notes.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </div>
        <div>
          {currentTask.problems.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </div>
        <ButtonContainer>
          <button onClick={problemModalHandler}>Add Problem</button>
          <button onClick={noteModalHandler}>Add Comment</button>
          <button onClick={completePressHandler}>Complete</button>
          <button onClick={postponePressHandler}>Postpone</button>
        </ButtonContainer>
      </ActiveTaskContainer>
    </>
  );
};

const ActiveTaskContainer = styled.div`
  /* position: absolute; */
  display: flex;
  height: 50%;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
  bottom: 10%;
  color: white;
  /* background: rgba(255, 255, 255, 0.1); */
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  flex-direction: column;
  backdrop-filter: blur(25px);
  border-radius: 1rem;

  & > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const Description = styled.div`
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  overflow-y: scroll;
  border: 1px solid #ccc;
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  /* grid-template-columns: 1fr 1fr; */
  gap: 0.5em;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1rem;

  & > button {
    padding: 0.25em;
    border-radius: 1rem;
    border: 1px solid #ccc;
    background-color: rgba(0, 0, 0, 0.1);
    color: white;
    min-width: 100px;
    cursor: pointer;
    &:hover {
      background-color: white;
      color: black;
    }
    &:focus {
      outline: none;
    }
  }
`;

export default ActiveTaskConatiner;
