import React, { useContext, useState } from "react";
import taskContext from "../contexts/TaskContext";
import { StyledClock } from "./PomodoTimer.style";
import Timer from "./Timer";

const PomodoroTimer = () => {
  const [message, setMessage] = useState("keep working");
  const { activatedTask } = useContext(taskContext);
  // const currentTask = activatedTask;
  const handleWorkEnd = () => {
    setMessage("rest for a while");
    alert("take a break");
  };
  const handleBreakEnd = () => {
    setMessage("keep working");
    alert("return to work");
  };

  // if (!activatedTask)
  //   return (
  //     <>
  //       <StyledClock>
  //         <Timer
  //           givenTime={{ hours: 25, mins: 0 }}
  //           workEnd={handleWorkEnd}
  //           breakEnd={handleBreakEnd}
  //         />
  //         <div style={{ color: "white" }}>{message}</div>
  //       </StyledClock>
  //     </>
  //   );

  return (
    <StyledClock>
      <Timer
        givenTime={activatedTask?.timeData??{ hours: 0, mins: 25 }}
        workEnd={handleWorkEnd}
        breakEnd={handleBreakEnd}
      />
      <div style={{ color: "white" }}>{message}</div>
    </StyledClock>
  );
};

export default PomodoroTimer;
