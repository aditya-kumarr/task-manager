import React, { useContext, useState } from "react";
import TaskDetailState from "../containers/TaskDetailContext";
import TaskListContainer from "../containers/TaskListContainer";
import { Spage, SPageContainer } from "../MainComponents/pages.style";
import taskContext from "../contexts/TaskContext";
const CompletedTasks = () => {
  const [show, setShow] = useState(false);
  const { completedList } = useContext(taskContext);

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
            listTitle="Completed Tasks"
            listOfTasks={completedList}
            onTaskClick={handleShow}
            state="completed"
          />
          <div style={{ zIndex: "100" }}></div>
        </SPageContainer>
      </Spage>
    </TaskDetailState>
  );
};

export default CompletedTasks;
