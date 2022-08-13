import React, { useContext, useState } from "react";
import TaskDetailState from "../containers/TaskDetailContext";
import TaskListContainer from "../containers/TaskListContainer";
import { Spage, SPageContainer } from "../MainComponents/pages.style";
import taskContext from "../contexts/TaskContext";
const TaskQueue = () => {
  const [show, setShow] = useState(false);
  const { queueList } = useContext(taskContext);

  const handleShow = () => {
    // setTask(_task);
    setShow(true);
  };
  const handleDetailsClick = () => {
    setShow(false);
  };
  return (
    <TaskDetailState>
      <Spage>
        <SPageContainer>
          <TaskListContainer
            listTitle="Tasks To be Completed"
            listOfTasks={queueList}
            onTaskClick={handleShow}
            state="inQueue"
          />
          <div style={{ zIndex: "100" }}></div>
          {/* <TaskDetails show={show} closePressed={handleDetailsClick} /> */}
        </SPageContainer>
      </Spage>
    </TaskDetailState>
  );
};

export default TaskQueue;
