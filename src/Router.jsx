import React from "react";
import { Routes, useLocation, Route } from "react-router-dom";
import AddTask from "./pages/AddTask";
import Homepage from "./pages/Homepage";
import TaskQueue from "./pages/TaskQueue";
import { AnimatePresence } from "framer-motion";
import PostponedTaskQueue from "./pages/PostponedTaskQueue";
import CompletedTasks from "./pages/CompletedTasks";
const Router = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/taskQueue" element={<TaskQueue />}></Route>
        <Route path="/addTask" element={<AddTask />}></Route>
        <Route path="/postponed" element={<PostponedTaskQueue />}></Route>
        <Route path="/history" element={<CompletedTasks />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
