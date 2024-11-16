import React from 'react';

interface IExampleProps {
    school: string;
    children : JSX.Element;
}

export default function Example(props: IExampleProps): JSX.Element {
    return (
        <div>
            <div> 안녕하세용 영희입니다.</div>
            <div>{props.school}</div>
            <div>{props.children}</div>
            <div> 안녕하세용 철수입니다.</div>
        </div>
    )
}