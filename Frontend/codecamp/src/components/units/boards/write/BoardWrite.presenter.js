import { RedInput, BlueButton } from './BoardWrite.styles'

export default function BoardWriteUI(props) {
   // only ui
    return (
        <div>
            작성자: <RedInput type="text" onChange={props.onClickSubmit}/>
            제목: <input type="text" onChange={props.onChangeTitle}/>
            내용: <input type="text" onChange={props.onChangeContents}/>
            <BlueButton onClick={props.onClickSubmit}> GraphQL 요청하기 </BlueButton>
        </div>
    )
}