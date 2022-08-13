import React, { useContext, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import taskContext from "../contexts/TaskContext";
import { AnimatePresence } from "framer-motion";
import { TaskDetailContext } from "./TaskDetailContext";
import { TaskInQueue } from "./TaskInQueue";
import Popup from "./Popup";
import { ListofText } from "./ListofText";
import DetailedTask from "./DetailedTask";

const TaskListContainer = ({ listTitle, state, listOfTasks = [] }) => {
  const { setSelectedTask,selectedTask } = useContext(TaskDetailContext);
  const [list, setlist] = useState(false);
  

  return (
    <>
      <TaskQueue>
        <Stitle>{listTitle}</Stitle>
        <AnimatePresence>
          {list && (
            <Popup onPressClose={() => setlist(false)}>
              <DetailedTask task={selectedTask} state={state} closePressed={()=>setlist(false)} />
            </Popup>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {listOfTasks.map((item, index) => {
            return (
              <TaskInQueue
                key={item.id}
                setSelectedTask={setSelectedTask}
                item={item}
                onTaskClick={() => setlist(!list)}
                index={index}
              ></TaskInQueue>
            );
          })}
        </AnimatePresence>
      </TaskQueue>
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1rem;
`;

const Stitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const TaskQueue = styled.section`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  flex-direction: column;
  width: 100%;
  /* height: ${(props) => props.isEmpty}; */
  height: max(100vh, 100%, 100000rem);
  border-radius: 1rem;
`;

// Details.defaultProps = {
//   initial: {
//     opacity: 0,
//     y: "-100vh",
//   },
//   animate: {
//     opacity: 1,
//     y: 0,
//   },
//   exit: {
//     opacity: 0,
//     y: "-100vh",
//   },
// };

export default TaskListContainer;
