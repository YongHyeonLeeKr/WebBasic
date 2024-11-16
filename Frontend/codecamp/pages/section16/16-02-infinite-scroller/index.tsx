import { gql, useQuery } from '@apollo/client'
import { IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/types'
import InfiniteScroll from 'react-infinite-scroller';

const FETCH_BOARDS = gql`
query fetchBoards($page: Int){
  fetchBoards(page: $page){
    _id
    writer
    title
    contents
  }
}
`

export default function StaticRountingMovedPage():JSX.Element {
    const { data, fetchMore } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(FETCH_BOARDS)
    console.log(data)
    console.log(data?.fetchBoards)

    const mystyle = {
        margin: "10px",
        padding: "10px"
    }


    const onLoadMore = (): void => {
        if(!data) return;
        void fetchMore({
            variables: { page: Math.ceil(data?.fetchBoards.length ?? 10 / 10) + 1 }, // 다음 페이지 의 게시물들 가져와요
            updateQuery: (prev, {fetchMoreResult}) => {
                if(fetchMoreResult.fetchBoards === undefined) {
                    return {
                        fetchBoards: [...prev.fetchBoards]
                    }
                };

                return {
                    fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards]
                }
            }
        })
    }


    return( 
        <>
        <div style={{height: '700px', overflow:'auto'}}>
        <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true} useWindow={false}>
            {data?.fetchBoards.map((el) => ( 
                <div key={el._id}>
                    <span style={mystyle}> {el.title}  </span>
                    <span style={mystyle}> {el.writer}  </span>
                </div>
            ))}
        </InfiniteScroll>
        </div>
        </>
    )
}