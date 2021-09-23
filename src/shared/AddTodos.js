import { Button, TextField } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import UpdateIcon from "@material-ui/icons/Update";
import CloseIcon from "@material-ui/icons/Close";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import AlertButton from "./../shared/AlertButton";
import { useEffect, useRef, useState } from "react";
import ShowTodo from "./ShowTodo";
const AddTodo = () => {
  const [todos, setTodos] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [index, setIndex] = useState(0);
  //
  const [succssMsg, setSuccessMsg] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [dltMsg, setDltMsg] = useState(false);
  //for todo name refrence
  //for close and update add
  const [isClickedUpdate, setIsClickedUpdate] = useState(false);
  ///// for empty input add
  const [emptyInput, setEmptyInput] = useState(false);


  // const [updateTitle, setUpdateTitle] = useState();
  const titleRef = useRef("Asas");

  const [title, setTitle] = useState("");

///adding todos to storage

useEffect(()=>{
      localStorage.setItem("todos", JSON.stringify(todos))
}, [])

  //submit todo

  const submitTodo = (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
    };
    if (titleRef.current.value) {
      if (isUpdate) {
        const newTodos = todos.slice();
        newTodos.splice(index, 1, data);
        setTodos(newTodos);
        titleRef.current.value = "";
        setIsUpdate(false);
      } else {
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

  console.log("todos", todos);

  //updating todo or edit todo

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

      <form onSubmit={submitTodo}>
        <TextField
          inputRef={titleRef}
          onKeyUp={(e) => {
            console.log("  e.target.value ", e.target.value);

            if (isUpdate) {
              if (todos.length > 0) {
                // match with state title
                setIsClickedUpdate(false)
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
        { emptyInput &&
          <AlertButton/>
        }
      </form>
      {succssMsg && (
        <div class="alert alert-success mt-4" role="alert">
          {alertMsg}
        </div>
      )}

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
