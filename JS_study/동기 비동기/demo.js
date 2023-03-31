//import fetch from "node-fetch";


const setTimeOutTest = () => {
    setTimeout(()=>{
    console.log('456');
}, 0)
console.log('123');
}


const myCallback = () => {
    const xmlHttpRequest = new XMLHttpRequest()
    xmlHttpRequest.open("get", `http://numbersapi.com/#random?min=1&max=10`)
    xmlHttpRequest.send()
    xmlHttpRequest.addEventListener("load", (res) => {
        console.log(res.target.readyState);
            const xmlHttpRequest2 = new XMLHttpRequest()
            xmlHttpRequest2.open("get", `http://numbersapi.com/#random?min=1&max=10`)
            xmlHttpRequest2.send()
            xmlHttpRequest2.addEventListener("load", (res) => {
                console.log(res.target.readyState);
                const xmlHttpRequest3 = new XMLHttpRequest()
                xmlHttpRequest3.open("get", `http://numbersapi.com/#random?min=1&max=10`)
                xmlHttpRequest3.send()
                xmlHttpRequest3.addEventListener("load", (res) => {
                console.log(res.target.readyState);
            }) 
        })
    })
}

const promiseTest =  function() {
 return new Promise((resolver,reject) => {
    try {
         // API 요청
        const result = "api call success"
        resolver(result);
    } catch (error) {
        // api 요청 실패
        const result = "api call Failure"
        reject(result);
    }
     }).then((res) => {
        console.log(res);
    }).catch((res)=> {
        console.log(res);
    });
}

const test_AxiosIsPromise = () => {
    axios
        .get(`http://numbersapi.com/#random?min=1&max=10`)
        .then((res) => {
            console.log(res)
            console.log('Axios도 사실 Promise 였다고 한다.')
        })
}




const reqNaver = function() {
  fetch(`https://www.naver.com`)
  .then((res) => {
        console.log(res) 
        
    }).catch((err)=> {
        console.log(err)
    })
}

