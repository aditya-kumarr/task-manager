import React, { useContext, useEffect, useState } from "react";
import taskContext from "../../contexts/TaskContext";
import { ACTIONS } from "../../contexts/taskState";
import { ToastContext } from "../../Toast/ToastContext";
import Toast, { SToastContainer } from "../../Toast/Toast";

import {
  SButton,
  SForm,
  SFormControl,
  SFormTitle,
  SLable,
  SInput,
  STextArea,
} from "./ControlledFrom.style";
import OptionInput from "./OptionInput";
const ControlledForm = () => {
  const TaskType = ["Building", "Learning", "Solving", "Memorizing"];
  const Need = ["Skill", "Burden", "Money"];

  const { dispatch } = useContext(taskContext);

  // const [openToast, setOpenToast] = useState(false);
  const { toastDispatch } = useContext(ToastContext);

  const [taskData, setTaskData] = useState({
    taskType: "",
    need: "",
    taskName: "",
    taskDescription: "",
    problems: [],
    notes: [],
    taskState: "inQueue",
    id: new Date().getTime(),
    createdOn: new Date().toLocaleString(),
    completedAt: "",
  });

  const handleTaskData = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTaskData({
      ...taskData,
      id: new Date().getTime(),
      createdOn: new Date().toLocaleString(),
    });
    dispatch({ type: ACTIONS.ADD_TASK, payload: taskData });
    toastDispatch({ type: "SHOW", message: "Task Added" });
  };

  return (
    <>
      <SForm onSubmit={handleFormSubmit}>
        <SFormTitle>Add Task</SFormTitle>
        <SFormControl>
          <SLable>Task Name</SLable>
          <SInput
            name="taskName"
            value={taskData.taskName}
            onChange={handleTaskData}
            required
          />
          <SLable>Task Description</SLable>
          <STextArea
            name="taskDescription"
            value={taskData.taskDescription}
            onChange={handleTaskData}
          />
          <OptionInput
            options={TaskType}
            name="taskType"
            selected={taskData.taskType}
            handleChange={handleTaskData}
          />
          <OptionInput
            options={Need}
            name="need"
            selected={taskData.need}
            handleChange={handleTaskData}
          />
        </SFormControl>
        <SButton>Add</SButton>
      </SForm>
    </>
  );
};

export default ControlledForm;
