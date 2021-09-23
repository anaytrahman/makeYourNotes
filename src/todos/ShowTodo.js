import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
const ShowTodo = ({
  todos,
  deleteAllTodoHandler,
  updateTodoHandler,
  deleteHandler,
  dltMsg,
  alertMsg
  
}) => {
  const ColorRed = {
    color: "red",
  };
  return (
    <>
      {/*show todos*/}
      <div>
        {/* {todos && todos.length > 0 && (
          <button onClick={deleteAllTodoHandler}> Delete All todo</button>
        )} */}
        <div className="alert-box">
        {dltMsg && (
          <div class="alert alert-danger mt-5" role="alert">
            {alertMsg}
          </div>
        )}
        </div>
       
        {!todos && todos.length <1 &&  (
          <div className="alert alert-warning mt-5" role="alert">
            There is no any Notes right now . Please Create your Todo.
          </div>
        )}
        <div className="show-todo-wrapper">
          {todos &&
            todos.length > 0 &&
            todos.map((todo, index) => (
              <div className="boxes" key={index}>
                {todo.title && (
                  <div className="title-wrapper">
                    <ul>
                      <li>{todo.title}</li>
                    </ul>
                  </div>
                )}
                {/* action wrapper */}
                <div className="actions-wrapper">
                  <button onClick={() => updateTodoHandler(index, todo.title)}>
                    <EditIcon style={({ ColorRed }, { color: "blue" })} />
                  </button>
                  <button onClick={() => deleteHandler(index, todo.title)}>
                    <DeleteIcon style={ColorRed} />
                  </button>
                  <button>
                    <DoneIcon />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ShowTodo;
