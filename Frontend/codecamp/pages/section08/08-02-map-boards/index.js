import { gql, useQuery } from '@apollo/client'


const FETCH_BOARDS = gql`
query {
  fetchBoards{
    writer
    title
    contents
  }
}
`

export default function StaticRountingMovedPage() {



    const { data } = useQuery(FETCH_BOARDS)
    console.log(data)
    console.log(data?.fetchBoards)

    const mystyle = {
        margin: "10px",
        padding: "10px"
    }
    return( 
        <div>
            {data?.fetchBoards.map(el => 
                <div>
                    <span> <input type="checkbox"/> </span>      
                    <span style={mystyle}> {el.number}</span>
                    <span style={mystyle}> {el.title}  </span>
                    <span style={mystyle}> {el.writer}  </span>
                </div>
            )}
        </div>
    )
}