import { useState } from 'react';

export default function CommnetItem(props: any): JSX.Element {


    const [isEdit, setIsEdit] = useState(false)

    const onClickEdit =() => {
        setIsEdit(true);
    }

        const mystyle = {
        margin: "10px",
        padding: "10px"
    }
    return (
        <div>
           {!isEdit ? ( 
                <div>
                    <span style={mystyle}> {props.el.title}  </span>
                    <span style={mystyle}> {props.el.writer}  </span>
                    <button onClick={onClickEdit}>수정하기</button>
                </div>
            ): (
                <input type="text"  />
            )}
            </div>
    );
}