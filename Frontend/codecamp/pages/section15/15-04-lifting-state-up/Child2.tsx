import { useState } from 'react'

export default function Child2(props: any): JSX.Element {
    return (
    <>
    <div> Child2'c Count : {props.count}</div>
    <button onClick={props.onClickCount}>카운트 올리기</button>
    </>
    )
}