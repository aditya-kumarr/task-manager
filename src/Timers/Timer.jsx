import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import taskContext from "../contexts/TaskContext";
import { DurationBeteween, endTime } from "./TimeLib";

const Timer = ({ givenTime, workEnd, breakEnd }) => {
  const { activatedTask } = useContext(taskContext);
  // The actual time that will eventually get reduced to zero
  let duration = {
    minutes: 25,
    seconds: 0,
  };
  // A small API for handling the localStorage in a clean way
  const StoreTime = {
    setTime: (time) =>
      localStorage.setItem("endTime", JSON.stringify({ time })),
    // setBreakTime: (time) =>
    //   localStorage.setItem("breakTime", JSON.stringify(time)),
    getTime: () => JSON.parse(localStorage.getItem("endTime")),
    // getBreakTime: () => JSON.parse(localStorage.getItem("breakTime")),
    // removeTime: () => localStorage.removeItem("endTime"),
  };
  // represents the currentTime

  const currTime = {
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  };

  useEffect(() => {
    StartTimer(Number(givenTime.hours), Number(givenTime.mins));
  }, [activatedTask]);

  // todo: find a way to reset the timer if the timer's id is not equal to the id of the current task

  //   the duation of break time after each and every timer ends

  // const breakTime = StoreTime.getBreakTime();
  //   now we can take a duration period and reduce it until breakTime
  let workingPeriod = true;

  //   we're grabbing the div element to change it's innerText to the time which we want
  const counterTime = useRef();
  useEffect(() => {
    let interval = setInterval(() => {
      if (duration.minutes <= 0 && duration.seconds <= 0) {
        localStorage.clear("endTime");
        duration = {
          minutes: 25,
          seconds: 0,
        };
        StoreTime.setTime( endTime(currTime, [0, duration.minutes, duration.seconds]));
      }
      if (duration.seconds <= 0) {
        if (duration.minutes > 0) {
          // setSeconds(59);
          duration.seconds = 59;
          // setMinutes(minutes - 1);
          duration.minutes -= 1;
        } else {
          //   this is duration when the timer ends

          let minutes = 0;
          let seconds = 0;

          if (workingPeriod) {
            minutes = 5;
            seconds = 0;
            workEnd();
          } else {
            minutes = 25;
            seconds = 0;
            breakEnd();
          }

          // setSeconds(seconds);
          duration.seconds = seconds;
          // setMinutes(minutes);
          duration.minutes = minutes;
          // setHours(hours);
          // setWorkingPeriod(!workingPeriod);
          workingPeriod = !workingPeriod;
        }
      } else {
        //   this happens every duration the second is not zero
        // setSeconds(seconds - 1);
        duration.seconds -= 1;
      }
      const timerMinutes =
        duration.minutes < 10 ? `0${duration.minutes}` : duration.minutes;
      const timerSeconds =
        duration.seconds < 10 ? `0${duration.seconds}` : duration.seconds;

      counterTime.current.innerText = `${timerMinutes}:${timerSeconds}`;
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [activatedTask]);

  return <NumericTimer ref={counterTime}>00:00</NumericTimer>;

  function StartTimer(_hour, _minute) {
    if (!StoreTime.getTime()) {
      StoreTime.setTime(
        endTime(currTime, [0, duration.minutes, duration.seconds])
      );
    } else {
      // we want to get the persistant duration which is basically timeAtwhich the timer ends - currentTime

      duration = DurationBeteween(StoreTime.getTime().time, {
        ...currTime,
        hours: 0,
      });
    }
  }
  function ResetTimer() {
    StoreTime.removeTime();
    duration = {
      hours: 0,
      minutes: 5,
      seconds: 0,
    };
  }
};

const NumericTimer = styled.div`
  font-family: monospace;
  font-size: 2.5rem;
  color: white;
`;

export default Timer;
