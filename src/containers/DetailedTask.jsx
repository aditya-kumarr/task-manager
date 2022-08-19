import { AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ButtonGroup, SButton } from "../components/Froms/ControlledFrom.style";
import taskContext from "../contexts/TaskContext";
import { ModalContext } from "../components/Modal/ModalContext";
import { ListofText } from "./ListofText";
import Popup from "./Popup";
import { ACTIONS } from "../contexts/taskState";
import { ToastContext } from "../Toast/ToastContext";
import PropmtComponent from "../components/Modal/PropmtComponent";
import { FormComponent } from "../components/Modal/FormComponent";
// import Promptcom``

const DetailedTask = ({
  task = {
    taskName: "",
    taskDescription: "",
    taskType: "",
    need: "",
    createdOn: "",
  },
  closePressed,
  state,
}) => {
  const [list, setList] = useState(false);
  const [problems, setProblems] = useState(false);
  const { dispatch } = useContext(taskContext);
  const { toastDispatch } = useContext(ToastContext);
  const { modalDispatch } = useContext(ModalContext);

  const onActivateTask = () => {
    modalDispatch({
      type: "SHOW",
      message: (
        <PropmtComponent
          onPrompt={(res) => {
            if (res) {
              dispatch({ type: ACTIONS.ACTIVATE_TASK, payload: selectedTask });

              toastDispatch({
                type: "SHOW",
                message: `${selectedTask.taskName} activated`,
              });
            } else {
              toastDispatch({
                type: "SHOW",
                message: `Cancelled`,
              });
            }
            closePressed();
            modalDispatch({ type: "HIDE" });
          }}
          options={{ yes: "Activate", no: "Cancel" }}
          title={"you sure you wanna activate this task ?"}
        />
      ),
      heading: "Activate",
    });

    // After the modal prompt is true
  };

  const onRemoveTask = () => {
    // after the prompt is true
    modalDispatch({
      type: "SHOW",
      message: (
        <PropmtComponent
          onPrompt={(res) => {
            if (res) {
              dispatch({ type: ACTIONS.REMOVE_TASK, payload: selectedTask });
              toastDispatch({
                type: "SHOW",
                message: `${selectedTask.taskName} Removed`,
              });
            } else {
              toastDispatch({
                type: "SHOW",
                message: `Cancelled`,
              });
            }
            closePressed();
            modalDispatch({ type: "HIDE" });
          }}
          title={"you sure you wanna Delete this task ?"}
          options={{ yes: "Delete", no: "Cancel" }}
        />
      ),
      heading: "Delete",
    });
  };
  const onProblemSubmitHandler = (data) => {
    modalDispatch({ type: "HIDE" });
    dispatch({
      type: ACTIONS.ADD_PROBLEM,
      payload: task,
      problem: data["problem"],
    });
  };
  const onNoteSubmitHandler = (data) => {
    modalDispatch({ type: "HIDE" });

    dispatch({
      type: ACTIONS.ADD_FEEDBACK,
      payload: task,
      note: data["note"],
    });
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

  return (
    <div>
      <div>
        <Slabel>Name</Slabel> : {task.taskName}
      </div>
      <div>
        <Slabel>Description</Slabel> : {task.taskDescription}
      </div>
      <div>
        <Slabel>Type</Slabel> : {task.taskType}
      </div>
      <div>
        <Slabel>Created On</Slabel> : {task.createdOn}
      </div>
      <div>
        <Slabel>Need</Slabel> : {task.need}
      </div>
      <ButtonGroup fontsize="1rem">
        {state !== "completed" && (
          <SButton onClick={onActivateTask}>Activate</SButton>
        )}
        <SButton onClick={onRemoveTask}>Remove</SButton>
        <SButton
          onClick={() => {
            setProblems(true);
            setList(false);
          }}
        >
          Show Problem
        </SButton>
        <SButton
          onClick={() => {
            setList(true);
            setProblems(false);
          }}
        >
          Show Notes
        </SButton>
      </ButtonGroup>
      <AnimatePresence>
        {problems && (
          <Popup onPressClose={() => setProblems(false)}>
            <ListofText
              title="Problems"
              list={task.problems}
              buttonPressHandler={problemModalHandler}
            />
          </Popup>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {list && (
          <Popup onPressClose={() => setList(false)}>
            <ListofText
              title="Notes"
              list={task.notes}
              buttonPressHandler={noteModalHandler}
            />
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
};

const Slabel = styled.label`
  display: inline-block;
  font-weight: 600;
  min-width: 6rem;
`;

const PopupButton = styled.button`
  max-width: 5rem;
`;

export default DetailedTask;
