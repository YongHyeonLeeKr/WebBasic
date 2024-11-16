import { useState } from 'react'
import Child1 from './Child1';
import Child2 from './Child2';

export default function CounterLetDocumentPage(): JSX.Element {

    const [count, setCount] = useState(0);

    const onClickCount = (): void => {
        setCount(prev => prev + 1)
    }


    // html 영역
    return (
    <>
        <Child1 count={count} setCount={setCount} />
        ___________________________________
        <Child2 count={count} onClickCount = {onClickCount}/>
    </>
    )
}