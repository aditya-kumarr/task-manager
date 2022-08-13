import React, { useState, createContext } from "react";

export const TaskDetailContext = createContext();

const TaskDetailState = (props) => {
  const [selectedTask, setSelectedTask] = useState({});
  return (
    <TaskDetailContext.Provider value={{ selectedTask, setSelectedTask }}>
      {props.children}
    </TaskDetailContext.Provider>
  );
};

export default TaskDetailState;
