
//rafc 리액트 스니펫 꿀팁!
import React from 'react'

export const List = ({todos, loading}) => {

    let todoList = "로딩중입니다.";
    if(!loading)
        todoList = todos.map( (todo) => {return <li key = {todo.id}> {todo.content}</li>})
    
    
    return (
        <ul>
            {todoList}
        </ul>
    )
}

export default List; 