import { RedInput, BlueButton } from './BoardWrite.styles'

export default function BoardWriteUI(props) {
   // only ui
    return (
        <div>
            <div> 여기는 프리젝터 </div>
            작성자: <RedInput type="text" onChange={props.onChangeWriter} defaultValue={props.data?.fetchBoard.writer}/>
            비밀번호: <input type="text" onChange={props.onChangePassword} defaultValue={props.data?.fetchBoard.password}/>
            제목: <input type="text" onChange={props.onChangeTitle} defaultValue={props.data?.fetchBoard.title}/>
            내용: <input type="text" onChange={props.onChangeContents} defaultValue={props.data?.fetchBoard.contents}/>
            <BlueButton onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}>
                {props.isEdit ? '수정' : '등록'}하기
            </BlueButton>
            <div> 여기는 프리젝터 </div>
        </div>
    )
}