import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export function TaskInQueue(props) {
  return (
    <QueueTask
      initial={{ x: -1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 1000, opacity: 0 }}
      transition={{ duration: 0.2 * props.index < 1 ? 0.2 * props.index : 1 }}
      onClick={() => {
        props.setSelectedTask(props.item);
        props.onTaskClick();
      }}
    >
      <div>{props.item.taskName}</div>
      <div>{props.item.taskDescription}</div>
    </QueueTask>
  );
}
export const QueueTask = styled(motion.div)`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  /* backdrop-filter: blur(10px); */
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.75rem;
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
