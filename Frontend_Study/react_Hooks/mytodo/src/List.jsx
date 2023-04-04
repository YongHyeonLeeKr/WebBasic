
//rafc 리액트 스니펫 꿀팁!
import React from 'react'

export const List = ({todos}) => {

    const todoList = todos.map( todo => <li>{todo}</li>)
    return (
        <ul>
            {todoList}
        </ul>
    )
}

export default List; 