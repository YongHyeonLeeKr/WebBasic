import ReactDOM from 'react-dom/client';
import {Fragment} from "react";

const root = ReactDOM.createRoot(document.getElementById('root'));
const product = '맥북'
root.render(<Fragment >
    <h1 id={'title'}> 가위바위보</h1>
    <button className="hand"> 가위</button>
    <button className="hand"> 바위</button>
    <button className="hand"> 보</button>
    <h1> 나만의 {product} 주문하기</h1>
</Fragment>);