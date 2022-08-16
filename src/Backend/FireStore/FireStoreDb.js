import {
  collection,
  getFirestore,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
const db = getFirestore();

// this will be null during initialisation

// this will be initialised during the SET_USER action
//
// when this gets initialised then the getTaskList and getActivatedTask methods will be called as well
let docRef = null;

// the same function for grabbing the document that belongs to the current user
// @depricated, don't use pls
export const _SetDocRef = (userId) => {
  docRef = doc(db, "users", userId);
  getDoc(docRef)
    .then((doc) => {
      if (!doc.data()) {
        setDoc(docRef, { activatedTask: null, taskList: [] }).then(() => {
          getDoc(docRef).then((doc) => console.log(doc.data()));
        });
      } else {
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const GetTaskList = async (userId) => {
  docRef = doc(db, "users", userId);
  try {
    const userDoc = await getDoc(docRef);
    if (userDoc.data()) {
      return userDoc.data();
    } else {
      await setDoc(docRef, { activatedTask: null, taskList: [] });
      const userDoc = await getDoc(docRef);
      return userDoc.data();
    }
  } catch (err) {
    return { taskList: [], activatedTask: null };
  }
};

// the fundamental difference between Lstore and the firestore is that
// in the localStorage we were storing all the tasks individually as key value pairs but in the firestore we're going to store all the tasks in an array inside one document with id===userId
// so we we need to make a few changes here like
// for updating the activatedTask I'll simply pass the activated task:payload and everything wil be sorted automatically
// for updating a particular task in the array I have to pass all the tasks in the array along with the changed task like taskArray = [...rest,action.payload]
// So for performing any action on the task array I need to destroy the entire
// old array and pass the new array just like the reducer.

// for updating and adding any task to the taskList
export async function UpdateTaskList(taskList) {
  await updateDoc(docRef, {
    taskList,
  });
}

export async function SetActivatedTask(activatedTask) {
  await updateDoc(docRef, {
    activatedTask,
  });
}

// for getting all the tasks from the taskArray (going to be used in initialisation)
// so clearly I cannot pass this function as the initial state of the task because the currentUser would be null

// so this function needs to be called after the the current user is onAuthStateChanged function() and this instead

export function GetAllTasks() {
  getDoc(docRef).then((doc) => {
    return doc.data.taskList;
  });
}

// for updating the current task

// returns an activated task for the end

// 2.Setting activated Task to the payload for a given document.

// 3.Getting the activated task for the given document

// 4.making the activated task null.

// 5.Removing a particular task from the task Array

// 6.Add an Item to the task Array field of the given document

export function createUserDocument(task) {
  const docRef = doc(db, "users", currentUser.uid);
  setDoc(docRef, { activeTask, taskList });
}

// 7.Updating the given item in the task Array of the given document.
