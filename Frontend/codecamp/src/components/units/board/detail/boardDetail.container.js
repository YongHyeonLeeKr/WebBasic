import {useRouter} from "next/router";
import {useQuery} from "@apollo/client";
import BoardDetailUI from "./boardDetail.presenter";
import {FETCH_BOARD, RESTFUL_FETCH_BOARD} from "./boardsDetail.queries";
import {useEffect, useState} from "react";



export default function BoardDetail() {
    const router = useRouter()
    const [data, setData] = useState(null); // 데이터를 상태로 관리

    useEffect(async () => {
        const result = await RESTFUL_FETCH_BOARD(router.query.boardId); // 데이터 가져오기
        setData(result.data); // 상태 업데이트
        console.log(result.data)
    }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 실행


    const onClickMoveToBoardList = () => {
        router.push("/boards")
    }

    const onClickMoveToBoardEdit = () => {
        router.push(`/boards/${router.query.boardId}/edit`)
    }

    return <BoardDetailUI data={data}
        onClickMoveToBoardList = {onClickMoveToBoardList}
        onClickMoveTodBoardEdit = {onClickMoveToBoardEdit}
    />
}