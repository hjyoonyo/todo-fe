import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api"

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  //get
  const getTasks = async()=>{
    const response = await api.get('/tasks');
    console.log("rrrr", response);

    setTodoList(response.data.data);
  };
  
  //post
  const addTask=async ()=>{
    try{
      const response = await api.post('/tasks',{
        task:todoValue, 
        isComplete:false
      });
      if(response.status===200){
        console.log('성공');
        // 1. 입력 값 안 사라짐.
        setTodoValue('');
        // 2. 추가한 값 안 보임.
        getTasks();
      }else{
        throw new Error('task can not be added');
      }
    }catch(err){
      console.log("error",err);
    }
  }

  //update
  const toggleComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //delete
  const deleteItem = async (id) => {
    try{
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      
       if(response.status===200){
         console.log('삭제 성공');
         getTasks();
       }
    }catch(err){
      console.log("error",err);
    }
  };

  //맨 처음 앱이 로드될 때
  useEffect(()=>{
    getTasks();
  },[])

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value = {todoValue}
            onChange={(event)=>setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard 
        todoList={ todoList }
        deleteItem = { deleteItem }
        toggleComplete={toggleComplete}
      />
    </Container>
  );
}

export default App;
