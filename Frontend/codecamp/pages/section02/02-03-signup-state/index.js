import { useState } from 'react'
import axios from 'axios'


export default function RestGetPage() {

  const [title, setTitle] = useState("")


  function onClickAsync() {
    const result = axios.get("https://koreanjson.com/posts/1")
    console.log(result)
  }

  const  onClickSync = async () => {
    const result = await axios.get("https://koreanjson.com/posts/1")
    console.log(result)
    setTitle(result.data.title)
  }

  return ( <>
    <button onClick={onClickAsync}> REST API (비동기) 요청  </button>
    <button onClick={onClickSync}> REST API (동기) 요청 : {title}  </button>
  </>)
    
}

