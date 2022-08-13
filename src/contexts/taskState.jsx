import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";
import React, { useReducer, useEffect } from "react";
import {
  GetTaskList,
  SetActivatedTask,
  UpdateTaskList,
} from "../Backend/FireStore/FireStoreDb";
import { auth } from "../firebase";
// import {
//   AddItem,
//   ClearActivatedTask,
//   GetActivatedTask,
//   GetItemList,
//   RemoveItem,
//   SetActivatedTask,
//   SetList,
//   UpdateItem,
// } from "../LocalDatabase/LStore";
import TaskContext from "./TaskContext";

// The issue was that the task list was initialized by as an array but after the dispatching any action
// it got changed to an object which is not iterable.
// the solution is to keep the state as an array in even after dispatching any actions.

export const ACTIONS = {
  INITIALIZE_TASKLIST: "INITIALIZE_TASKLIST",
  ADD_TASK: "ADD_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  ACTIVATE_TASK: "ACTIVATE_TASK",
  POSTPONE_TASK: "POSTPONE_TASK",
  COMPLETE_TASK: "COMPLETE_TASK",
  ADD_PROBLEM: "ADD_PROBLEM",
  ADD_FEEDBACK: "ADD_FEEDBACK",
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

// const onTaskActivated = (func) => {
//   if (func) func();
// };

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CURRENT_USER:
      // Set the taskArray here.....

      return {
        ...state,
        taskList: action.taskList,
        activatedTask: action.activatedTask ?? { id: "dummy" },
        currentUser: action.user,
      };
    case ACTIONS.ADD_TASK:
      state.currentUser && UpdateTaskList([...state.taskList, action.payload]);
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      };
    case ACTIONS.REMOVE_TASK:
      // RemoveItem(action.payload);
      const filteredTaskList = state.taskList.filter(
        (item) => item.id !== action.payload.id
      );
      state.currentUser && UpdateTaskList(filteredTaskList) 
      return {
        ...state,
        taskList: filteredTaskList,
      };
    case ACTIONS.UPDATE_TASK:
      // UpdateItem(action.payload);
      const taskList = state.taskList.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      return { ...state, taskList };
    case ACTIONS.ACTIVATE_TASK:
      // endgoal: to update the taskState of the given payload
      // action.payload == titleObj
      // but in this case action.payload== {taskData,state}
      // return the whole taskList array + action.payload.taskData[state]

      // this runs when teh activated Task is fetched from localStorage

      if (state.activatedTask) {
        if (state.activatedTask.id !== "dummy") {
          state.activatedTask.taskState = "inQueue";
          // UpdateItem(state.activatedTask);
          // UpdateTaskList([...state.taskList,state.activatedTask])
        }
        const rest = state.taskList.filter((item) => {
          return (
            item.id !== action.payload.id && item.id !== state.activatedTask.id
          );
        });
        const newTask = { ...action.payload, taskState: "active" };
        // UpdateItem(newTask);
        state.currentUser
          && UpdateTaskList([...rest, newTask, state.activatedTask])
          
        // SetActivatedTask(newTask);
        state.currentUser && SetActivatedTask(newTask) 
        return {
          ...state,
          taskList: [...rest, newTask, state.activatedTask],
          activatedTask: newTask,
        };
      } else {
        const rest = state.taskList.filter((item) => {
          return item.id !== action.payload.id;
        });
        const newTask = { ...action.payload, taskState: "active" };
        state.currentUser && UpdateTaskList([...rest, newTask]) 
        state.currentUser && SetActivatedTask(newTask) 
        // SetActivatedTask(newTask);
        return {
          ...state,
          taskList: [...rest, newTask],
          activatedTask: newTask,
        };
      }

    case ACTIONS.POSTPONE_TASK:
      // Todo: change the tasklist[state==activated] to postponed and activated task == {id:dummy}
      // return the
      const newTask2 = { ...state.activatedTask, taskState: "postponed" };
      state.currentUser && SetActivatedTask(null) 
      const rest2 = state.taskList.filter(
        (item) => item.id !== action.payload.id && "dummy"
      );
      state.currentUser && UpdateTaskList([...rest2, newTask2]) 
      return {
        ...state,
        taskList: [...rest2, newTask2],
        activatedTask: { id: "dummy" },
      };
    case ACTIONS.COMPLETE_TASK:
      // change the activated task state as completed and then save it, then
      // add the set the activated task as dummy task then return all the tasks
      // except for the dummy and completed task + the newly activated task
      const newTask3 = { ...state.activatedTask, taskState: "completed" };
      console.log(newTask3);
      // UpdateItem(newTask3);
      state.currentUser && SetActivatedTask(null) 
      const rest3 = state.taskList.filter(
        (item) => item.id !== action.payload.id && "dummy"
      );
      state.currentUser && UpdateTaskList([...rest3, newTask3]) 
      return {
        ...state,
        taskList: [...rest3, newTask3],
        activatedTask: { id: "dummy" },
      };
    case ACTIONS.ADD_PROBLEM:
      state.currentUser
        && UpdateTaskList([
            ...state.taskList.filter(
              (task) => task.id !== state.activatedTask.id
            ),
            {
              ...state.activatedTask,
              problems: [...state.activatedTask.problems, action.problem],
            },
          ])
        
      state.currentUser
        && SetActivatedTask({
            ...state.activatedTask,
            problems: [...state.activatedTask.problems, action.problem],
          })
        
      return {
        ...state,
        activatedTask: {
          ...state.activatedTask,
          problems: [...state.activatedTask.problems, action.problem],
        },
      };
    case ACTIONS.ADD_FEEDBACK:
      // UpdateItem({
      //   ...state.activatedTask,
      //   problems: [...state.activatedTask.problems, action.note],
      // });
      // SetActivatedTask({
      //   ...state.activatedTask,
      //   problems: [...state.activatedTask.problems, action.note],
      // });
      console.log(state.activatedTask);
      state.currentUser
        && UpdateTaskList([
            ...state.taskList.filter(
              (task) => task.id !== state.activatedTask.id
            ),
            {
              ...state.activatedTask,
              notes: [...state.activatedTask.notes, action.note],
            },
          ])
        
      state.currentUser
        && SetActivatedTask({
            ...state.activatedTask,
            notes: [...state.activatedTask.notes, action.note],
          })
        

      return {
        ...state,
        activatedTask: {
          ...state.activatedTask,
          notes: [...state.activatedTask.notes, action.note],
        },
      };
    default:
      return state;
  }
};

// TODO : add a way to return the current activated task throughtout the application
// TODO: add a callback function that'll called when the current Task is changed

const TaskState = (props) => {
  let dummyTask = {
    id: "dummy",
  };
  // let state = GetItemList();
  // let activatedTask = GetActivatedTask();

  const [taskStore, dispatch] = useReducer(reducer, {
    taskList: [],
    activatedTask: dummyTask,
    currentUser: null,
  });

  const userChangeCallback = () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const initialTaskStore = await GetTaskList(user.uid);
        dispatch({
          type: ACTIONS.SET_CURRENT_USER,
          user: user,
          taskList: initialTaskStore.taskList,
          activatedTask: initialTaskStore.activatedTask,
        });
      }
    });
    return unsubscribe;
  };
  useEffect(() => {
    userChangeCallback();
  }, []);
  return (
    <TaskContext.Provider
      value={{
        taskList: taskStore.taskList,
        queueList: taskStore.taskList.filter(
          (task) => task.taskState === "inQueue"
        ),
        completedList: taskStore.taskList.filter(
          (task) => task.taskState === "completed"
        ),
        postponedList: taskStore.taskList.filter(
          (task) => task.taskState === "postponed"
        ),
        dispatch,
        activatedTask: taskStore.activatedTask ?? null,
        currentUser: taskStore.currentUser,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
export default TaskState;
