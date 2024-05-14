import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import BoardWrite from "../../../../src/components/units/board/write/BoardWrite.container";
import axios from "axios";
import {useEffect, useState} from "react";

const RESTFUL_FETCH_BOARD = async (boardId) => {
    try {
        const response = await axios.get(`http://localhost:6376/boards/${boardId}`);
        return response; // 서버 응답에서 데이터 부분만 반환
    } catch (error) {
        console.error("Failed to fetch boards:", error);
        throw error; // 에러 처리는 이 함수를 사용하는 쪽에서 진행
    }
}

export default function BoardsEditPage() {
    const router = useRouter()
    const [data, setData] = useState(null); // 데이터를 상태로 관리

    useEffect(async () => {
        console.log(router)
        const result = await RESTFUL_FETCH_BOARD(router.query.boardId); // 데이터 가져오기
        setData(result.data); // 상태 업데이트
        console.log(result.data)
    }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 실행


    return(
        <BoardWrite
        isEdit = {true}
        data={data}
    />
    )
}