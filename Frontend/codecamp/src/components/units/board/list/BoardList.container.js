import BoardListUI from "./BoardList.presenter";
import {useQuery} from "@apollo/client";
import {FETCH_BOARDS, RESTFUL_FETCH_BOARDS} from "./BoardList.queries";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function BoardList() {

    const router = useRouter()
    const [data, setData] = useState(null); // 데이터를 상태로 관리

    useEffect(async () => {
        const result = await RESTFUL_FETCH_BOARDS(); // 데이터 가져오기
        setData(result.data); // 상태 업데이트
        console.log(data)
    }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시에만 실행


    const onClickMoveToBoardNew = () => {
        router.push("/boards/new")
    }

    const onClickMoveToBoardDetail = (e) => {
        router.push(`/boards/${e.target.id}`)
    }

    return (
        <BoardListUI
        data = {data}
        onClickMoveToBoardNew = {onClickMoveToBoardNew}
        onClickMoveToBoardDetail = {onClickMoveToBoardDetail}
        />
    )

}