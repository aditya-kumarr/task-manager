import React from "react";
import AuthIcon from "../Backend/Signin/Auth/AuthIcon";
import ActiveTaskConatiner from "../containers/activeTaskConatiner";
import PomodoroTimer from "../Timers/PomodoroTimer";
import Timer from "../Timers/Timer";
import { SPageContainer, Spage } from "../MainComponents/pages.style";

const Homepage = () => {
  const workEnd = () => {};
  const breakEnd = () => {};
  return (
    <Spage>
      <SPageContainer>
        <AuthIcon />
        <PomodoroTimer />
        <ActiveTaskConatiner />
      </SPageContainer>
    </Spage>
  );
};

export default Homepage;
