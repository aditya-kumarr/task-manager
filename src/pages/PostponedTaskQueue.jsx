import React, { useContext, useState } from "react";
import TaskDetailState from "../containers/TaskDetailContext";
import TaskListContainer from "../containers/TaskListContainer";
import { Spage, SPageContainer } from "../MainComponents/pages.style";
import taskContext from "../contexts/TaskContext";
const PostponedTaskQueue = () => {
  const [show, setShow] = useState(false);
  const { postponedList } = useContext(taskContext);

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
            listTitle="Postponed Tasks"
            listOfTasks={postponedList}
            onTaskClick={handleShow}
            state="postponed"
          />
          <div style={{ zIndex: "100" }}></div>
          {/* <TaskDetails show={show} closePressed={handleDetailsClick} /> */}
        </SPageContainer>
      </Spage>
    </TaskDetailState>
  );
};

export default PostponedTaskQueue;
