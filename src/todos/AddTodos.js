import AddBoxIcon from "@material-ui/icons/AddBox";
import CloseIcon from "@material-ui/icons/Close";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import AlertButton from "./../shared/AlertButton";
import { useEffect, useRef, useState } from "react";
import ShowTodo from "./ShowTodo";
import { TextField } from "@material-ui/core";
const AddTodo = () => {
  //getting todos from localstorage
  const getTodoLs = JSON.parse(localStorage.getItem("todos")) || [];
  //storing todo in this state
  const [todos, setTodos] = useState(getTodoLs);
  //if update clicked chnage btn on condition
  const [isUpdate, setIsUpdate] = useState(false);
  //value change btn show hide
  const [isValueChanged, setIsValueChanged] = useState(false);
  //storing index for refrence current data
  const [index, setIndex] = useState(0);
  //
  const [succssMsg, setSuccessMsg] = useState(false);
  //msgs
  const [alertMsg, setAlertMsg] = useState("");
  //delete msg alert
  const [dltMsg, setDltMsg] = useState(false);
  //for todo name refrence
  //for close and update add
  const [isClickedUpdate, setIsClickedUpdate] = useState(false);
  ///// for empty input add alert
  const [emptyInput, setEmptyInput] = useState(false);

  // const [updateTitle, setUpdateTitle] = useState();
  const titleRef = useRef("Asas");

  const [title, setTitle] = useState("");

  ///adding todos to storage on state change //updated //delated/ added
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //submit todo to state and storing
  const submitTodo = (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
    };
    //checking if input value is valid
    if (titleRef.current.value) {
      //checking if clicked on update btn then update button will exacute here
      if (isUpdate) {
        console.log("myTodos1");
        const newTodos = todos.slice();
        newTodos.splice(index, 1, data);
        setTodos(newTodos);
        //after update input value  will clear
        titleRef.current.value = "";
        //setUpdate button hide and add btn will show
        setIsUpdate(false);
      } else {
        //after adding todo input will clear
        titleRef.current.value = "";
        //cloning old and adding new using spread oprator
        setTodos([...todos, data]);
        setAlertMsg("Todo Created!!");
        setSuccessMsg(true);
        setTimeout(() => {
          setSuccessMsg(false);
        }, 3000);
      }
    } else {
      setEmptyInput(true);
      setTimeout(() => {
        setEmptyInput(false);
      }, 2000);
    }
  };

  //updating todo // edit todo// update method
  //getting indexing , and title
  const updateTodoHandler = (index, updateTitle) => {
    setIsUpdate(true);
    setIndex(index);
    setTitle(updateTitle);
    titleRef.current.value = updateTitle;
    console.log("updateTitle ", updateTitle);
    // setUpdateTitle(updateTitle);
    setIsClickedUpdate(true);
  };

  //delete todos

  const deleteHandler = (indexId, title) => {
    setDltMsg(true);
    setAlertMsg("todo Deleted!!!");
    setTimeout(() => {
      setDltMsg(false);
    }, 3000);
    let newTodos = todos.slice();
    newTodos.splice(indexId, 1);
    setTodos(newTodos);
  };

  ///delete all todos

  const deleteAllTodoHandler = () => {
    setTodos([]);
  };
  ///

  const closeHandler = () => {
    titleRef.current.value = "";
    setIsClickedUpdate(false);
    setIsUpdate(false);
  };
  return (
    <>
      {isUpdate ? <h1>Update todo </h1> : <h1>Add todos </h1>}
      <div className="input-action"></div>
      <form onSubmit={submitTodo}>
        <div className="input-wrapper">
          <TextField
            inputRef={titleRef}
            onKeyUp={(e) => {
              console.log("  e.target.value ", e.target.value);

              if (isUpdate) {
                if (todos.length > 0) {
                  // match with state title
                  setIsClickedUpdate(false);
                  e.target.value === todos[index].title
                    ? setIsValueChanged(false)
                    : setIsValueChanged(true);
                }
              }
            }}
            label="Todo"
            id="standard-size-small "
            size="madium"
          />

          {isClickedUpdate && (
            <button type="button" onClick={closeHandler}>
              <CloseIcon style={{ color: "red" }} />
            </button>
          )}

          {isUpdate && isClickedUpdate === false && isValueChanged ? (
            <button type="submit">
              <EditRoundedIcon style={{ color: "red" }} />
            </button>
          ) : (
            isClickedUpdate === false && (
              <button type="submit">
                <AddBoxIcon style={{ color: "green" }} />
              </button>
            )
          )}
        </div>
      </form>

      <div className="alert-box">
        {emptyInput && <AlertButton />}
        {succssMsg && (
          <div className="alert alert-success" role="alert">
            {alertMsg}
          </div>
        )}
      </div>

      <ShowTodo
        todos={todos}
        deleteAllTodoHandler={deleteAllTodoHandler}
        updateTodoHandler={updateTodoHandler}
        deleteHandler={deleteHandler}
        dltMsg={dltMsg}
        alertMsg={alertMsg}
      />
    </>
  );
};

export default AddTodo;
