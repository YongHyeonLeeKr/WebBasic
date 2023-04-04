import './App.css';
import React, {useEffect, useState} from 'react';
import List from './List.jsx'


const App = () => {
  const [todos, setTodos] = useState(['JS공부하기']);
  const [newTodo, setNewTodo] = useState();
  
  const changeInputData = (e) => {
    setNewTodo(e.target.value) /* 할일 정보를 입력하 때마다 상태값을 가지고 있는 것이 좋다.  */
    console.log(newTodo);
  }  
  
  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, newTodo]) /* totos 에  */
  }

  useEffect(() => {
    console.log("useEffect() : 새로운 내용이 렌더링 됬습니다. ")
  })

   useEffect(() => {
    console.log("useEffect() : 새로운 todos가 추가돼었습니다 : ", todos)
  }, [todos])
return ( 
  <>
    <h1>  TODO 어플리케이션 </h1>
    <form action="">
      <input type="text" name="" onChange={changeInputData}/>  
      <button onClick={addTodo}>할일 추가</button>
    </form>
    
    <List todos={todos}/>

  </>
  )
};

export default App;
