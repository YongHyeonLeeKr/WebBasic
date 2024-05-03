import BoardWrite from "../../../../../src/components/units/board/09-write2/BoardWrite.container";
import {FETCH_BOARD} from "../../../../../src/components/units/board/09-write2/BoardWrite.queries";
import {useQuery} from "@apollo/client";
import {useRouter} from 'next/router'
export default function GraphqlMutationPage(props){

    const router = useRouter()
    const { data } = useQuery(FETCH_BOARD, {
        variables: {boardId: router.query.boardId},
    })


    return (
        <div>
            <BoardWrite
                isEdit = {true}
                data = {data}
            />
        </div>
    )
}