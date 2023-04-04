import './App.css';
import React, {useEffect, useState} from 'react';
import List from './List.jsx'


const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState();
  const [loading, setLoading] = useState(false)
  
  const changeInputData = (e) => {
    setNewTodo(e.target.value) /* 할일 정보를 입력하 때마다 상태값을 가지고 있는 것이 좋다.  */
    console.log(newTodo);
  }  
  
  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, {id : Math.floor(Math.random() * 1000000), content : newTodo}]) /* totos 에  */
  }

  const fetchingData = () => {
    setLoading(true);

    setTimeout(() => {
     const result =  [
       { id: 1, content: '구름이랑 산책'},
       { id: 2, content: '초댕이랑 산책'},
       { id: 3, content: '사업계획서 작성하기'},
       { id: 4, content: '펜션예약'},
      ]
      setLoading(false);
      setTodos(result);
    }, 2000);
    
      
      
      
  

  
     }

  useEffect(() => {
    fetchingData() 
  }, [])

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
    
    <List todos={todos} loading ={loading}/>

  </>
  )
};


export default App;

