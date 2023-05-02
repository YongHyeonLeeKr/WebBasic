import axios from 'axios'


// 비동기
function fetchPost() {
   const result =  axios.get("https://koreanjson.com/posts/1")
   console.log(result) // Promise { <pending> }
}


// 동기방식

async function fetchPost2() {
   const result = await axios.get("https://koreanjson.com/posts/1")
   console.log(result.data.title)
}


fetchPost2();

