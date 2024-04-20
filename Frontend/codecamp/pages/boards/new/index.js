import {
    Address, ButtonWrapper,
    InputWrapper,
    Label, OptionWrapper,
    Password, RadioButton, RadioLabel, SearchButton,
    Subject, SubmitButton,
    Title, UploadButton,
    Wrapper,
    Writer,
    WriterWrapper,
    Zipcode, ZipcodeWrapper, Error
} from "../../../styles/boardsNew";
import {useState} from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_BOARD = gql`
    mutation createBoard($writer: String, $title: String, $contents: String){
        createBoard(writer: $writer, title: $title, contents: $contents){
            _id 
            number 
            message
        }
    }
`



export default function BoardNewPage() {

    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [writerError,setWriterError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [titleError, setTitleError] = useState("")
    const [contentsError, setContentsError] = useState("")


    const [createBoard] = useMutation(CREATE_BOARD);

    const onChangeWriter = (event) => {
        setWriter(event.target.value);
        if(event.target.value !==""){
            setWriterError("")
        }
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
        if(event.target.value !== ""){
            setPasswordError("")
        }
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
        if(event.target.value !== ""){
            setTitleError("");
        }
    }

    const onChangeContents = (event) => {
        setContents(event.target.value);
        if(event.target.value !== "") {
            setContentsError("");
        }
    }

    const onClickSubmit = async () => {
        if(!writer) {
            setWriterError("작성자를 입력해주세요.");
        }
        if(!password) {
            setPasswordError("비밀번호를 입력해주세요.");
        }
        if(!title){
            setTitleError("제목을 입력해주세요.");
        }
        if(!contents){
            setContentsError("내용을 입력해주세요.");
        }

        if(writer && password && title && contents){
            const result = await createBoard({
                variables : {
                        writer: writer,
                        //password: password,
                        title: title,
                        contents: contents
                }
            })
            console.log(result);
        }
    }

    return (
        <Wrapper>
            <Title>게시글 등록</Title>
            <WriterWrapper>
                <InputWrapper>
                    <Label>작성자</Label>
                    <Writer type="text" placeholder="이름을 입력해주세요" onChange={onChangeWriter}></Writer>
                    <Error>{writerError}</Error>
                </InputWrapper>
                <InputWrapper>
                    <Label> 비밀번호 </Label>
                    <Password type="text" placeholder='비밀번호를 입력해주세요' onChange={onChangePassword}></Password>
                    <Error>{passwordError}</Error>
                </InputWrapper>
            </WriterWrapper>
            <InputWrapper>
                <Label>제목</Label>
                <Subject type='text' placeholder='제목을 작성해주세요' onChange={onChangeTitle}/>
                <Error>{titleError}</Error>
            </InputWrapper>
            <InputWrapper>
                <Label>내용</Label>
                <Subject type='text' placeholder='내용을 작성해주세요' onChange={onChangeContents}/>
                <Error>{contentsError}</Error>
            </InputWrapper>
            <InputWrapper>
                <Label>주소</Label>
                <ZipcodeWrapper>
                    <Zipcode placeholder='07250'/>
                    <SearchButton> 우편번호 검색</SearchButton>
                </ZipcodeWrapper>
                <Address />
                <Address />
            </InputWrapper>
            <InputWrapper>
                <Label>사진첨부</Label>
                <UploadButton>+</UploadButton>
                <UploadButton>+</UploadButton>
                <UploadButton>+</UploadButton>
            </InputWrapper>
            <OptionWrapper>
                <Label>메인설정</Label>
                <RadioButton type='radio' id='youtube' name='radio-button'/>
                <RadioLabel htmlFor='youtube'>유튜브</RadioLabel>
                <RadioButton type='radio' id='image' name='radio-button'/>
                <RadioLabel htmlFor='image'>사진</RadioLabel>
            </OptionWrapper>
            <ButtonWrapper>
                <SubmitButton onClick={onClickSubmit}>등록하기</SubmitButton>
            </ButtonWrapper>


        </Wrapper>
    )
}