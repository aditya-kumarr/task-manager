import { FormComponent } from "../components/Modal/FormComponent";
import { ACTIONS } from "../contexts/taskState";

export const NoteModalHandler = (modalDispatch, dispatch, task, callback) => {
  modalDispatch({
    type: "SHOW",
    message: (
      <FormComponent
        buttonName="Add"
        formArr={[
          {
            label: "Note",
            name: "note",
            type: "text",
          },
        ]}
        formTitle="Notes ?"
        onSubmitAction={(data) =>
          onNoteSubmitHandler(data, dispatch, modalDispatch, task, callback)
        }
      />
    ),
    heading: "Wanna give some feedback",
  });
};

const onNoteSubmitHandler = (data, dispatch, modalDispatch, task, callback) => {
  modalDispatch({ type: "HIDE" });

  dispatch({
    type: ACTIONS.ADD_FEEDBACK,
    payload: task,
    note: data["note"],
  });
  callback && callback();
};

export const ProblemModalHandler = (
  modalDispatch,
  dispatch,
  task,
  callback
) => {
  modalDispatch({
    type: "SHOW",
    message: (
      <FormComponent
        buttonName="Add"
        formArr={[
          {
            label: "Problem",
            name: "problem",
            type: "text",
          },
        ]}
        formTitle="Problem ?"
        onSubmitAction={(data) =>
          onProblemSubmitHandler(data, task, dispatch, modalDispatch, callback)
        }
      />
    ),
    heading: "You have any problem",
  });
};

const onProblemSubmitHandler = (
  data,
  task,
  dispatch,
  modalDispatch,
  callback
) => {
  modalDispatch({ type: "HIDE" });
  dispatch({
    type: ACTIONS.ADD_PROBLEM,
    payload: task,
    problem: data["problem"],
  });
  callback && callback();
};
