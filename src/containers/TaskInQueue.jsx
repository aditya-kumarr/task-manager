import React from "react";
import styled from "styled-components";
import { FaThinkPeaks, FaBrain, FaBook, FaCube, FaBurn } from "react-icons/fa";
import { motion } from "framer-motion";

const IconMap = {
  money: <FaThinkPeaks />,
};

export function TaskInQueue({ index, item, setSelectedTask, onTaskClick }) {
  return (
    <QueueTask
      initial={{ x: -1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 1000, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
      onClick={() => {
        setSelectedTask(item);
        onTaskClick();
      }}
    >
      <TaskLogo>
        <FaBurn />
      </TaskLogo>
      <div>
        <TaskTitle>{item.taskName}</TaskTitle>
        <TaskDescription>{item.taskDescription}</TaskDescription>
      </div>
    </QueueTask>
  );
}
export const QueueTask = styled(motion.div)`
  display: flex;
  /* flex-direction: column; */
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  /* backdrop-filter: blur(10px); */
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.75rem;
`;

const TaskTitle = styled.h2`
  font-weight: 700;
`;
const TaskDescription = styled.h2`
  font-weight: 300;
  color: #999;
`;

const TaskLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  width: 50px;
  height: 50px;
`;

const slide = {
  initial: {
    x: -100,
  },
  animate: {
    x: 0,
  },
  exit: {
    x: 100,
  },
};
