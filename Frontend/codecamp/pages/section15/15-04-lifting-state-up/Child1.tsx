import { useState } from 'react'

export default function Child1(props: any): JSX.Element {


    //js 영역
    function onClickCountUp(): void {
       props.setCount((prev: number) => prev + 1)
    }


    // html 영역
    return (
    <>
    <div > Child1's count {props.count}</div>
    <button onClick={onClickCountUp}>카운트 올리기</button>
    </>
    )
}