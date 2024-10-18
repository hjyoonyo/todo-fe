import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, deleteItem, toggleComplete }) => { //리덕스?
  return (
    <div>
      <h2>Todo List</h2>
      { todoList.length > 0 ? todoList.map((item, index)=>
          <TodoItem 
            item={item}
            key = {index}
            deleteItem = { deleteItem }
            toggleComplete={toggleComplete}
          />)
        : <h2>There is no Item to show</h2> 
      }
      {/* todoList에 값이 있으면 item을 하나씩 가져와서 넣겠다. */}
      {/* <TodoItem/> will be here once we get the todoList */}
    </div>
  );
};

export default TodoBoard;
