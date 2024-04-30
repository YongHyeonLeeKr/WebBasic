import { RedInput, BlueButton } from './BoardWrite.styles'

export default function BoardWriteUI(props) {
   // only ui
    return (
        <div>
            <div> 여기는 프리젝터 </div>
            작성자: <RedInput type="text" onChange={props.onChangeWriter}/>
            비밀번호: <input type="text" onChange={props.onChangePassword}/>
            제목: <input type="text" onChange={props.onChangeTitle}/>
            내용: <input type="text" onChange={props.onChangeContents}/>
            <BlueButton onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}>
                {props.isEdit ? '수정' : '등록'}하기
            </BlueButton>
            <div> 여기는 프리젝터 </div>
        </div>
    )
}