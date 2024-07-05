import * as S from "./boardsDetail.styles";


export default function BoardDetailUI(props) {

    return(
        <S.Wrapper>
            <S.CardWrapper>
                <S.Header>
                    <S.AvatarWrapper>
                        <S.Avatar src='/images/avatar.png'/>
                        <S.Info>
                            <S.Writer>{props.data?.writer}</S.Writer>
                            <S.CreatedAt>
                                {props.data?.createdAt}
                            </S.CreatedAt>
                        </S.Info>
                    </S.AvatarWrapper>
                </S.Header>
                <S.Body>
                    <S.Title>{props.data?.title}</S.Title>
                    <S.Contents>{props.data?.contents}</S.Contents>
                </S.Body>
            </S.CardWrapper>
            <S.BottomWrapper>
                <S.Button onClick={props.onClickMoveToBoardList}>목록으로</S.Button>
                <S.Button onClick={props.onClickMoveTodBoardEdit}>수정하기</S.Button>
                <S.Button>삭제하기</S.Button>
            </S.BottomWrapper>
        </S.Wrapper>
    );
}