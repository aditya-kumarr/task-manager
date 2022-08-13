import { AnimatePresence } from "framer-motion";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ButtonGroup, SButton } from "../components/Froms/ControlledFrom.style";
import taskContext from "../contexts/TaskContext";
import { ModalContext } from "../components/Modal/ModalContext";
import { ListofText } from "./ListofText";
import Popup from "./Popup";
import { TaskDetailContext } from "./TaskDetailContext";
import { ACTIONS } from "../contexts/taskState";
import { ToastContext } from "../hooks/ToastContext";
import PropmtComponent from "../components/Modal/PropmtComponent";
// import Promptcom``

const DetailedTask = ({
  task = {
    taskName: "Eat Chicken",
    taskDescription: "just a task what else can you expect",
    taskType: "bad type",
    need: "fun",
    createdOn: "DoomsDay",
  },
  closePressed,
  state
}) => {
  const [list, setList] = useState(false);
  const [problems, setProblems] = useState(false);
  const { dispatch } = useContext(taskContext);
  const { selectedTask } = useContext(TaskDetailContext);
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


  return (
    <div>
      <div>
        <Slabel>Name</Slabel> : {task.taskName}
      </div>
      <div>
        <Slabel >Description</Slabel> : {task.taskDescription}
      </div>
      <div>
        <Slabel>Type</Slabel> : {task.taskType}
      </div>
      <div>
        <Slabel>Created On</Slabel> : {task.createdOn}
      </div>
      <div><Slabel>Need</Slabel> : {task.need}</div>
      <ButtonGroup fontsize="1rem">
        {state!=="completed" && <SButton onClick={onActivateTask} >Activate</SButton>}
        <SButton onClick={onRemoveTask} >Remove</SButton>
        <SButton
          onClick={() => {
            setProblems(true);
            setList(false)
          }}
        >
          Show Problem
        </SButton>
        <SButton
          onClick={() => {
            setList(true);
            setProblems(false)
          }}
        >
          Show Notes
        </SButton>
      </ButtonGroup>
      <AnimatePresence>
        {problems && (
          <Popup onPressClose={()=>setProblems(false)}>
            <ListofText
              title="Problems"
              list={task.problems}
            />
          </Popup>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {list && (
          <Popup onPressClose={()=>setList(false)}>
            <ListofText
              title="Notes"
              list={task.notes}
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
