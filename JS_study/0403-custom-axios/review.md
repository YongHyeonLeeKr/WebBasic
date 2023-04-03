# 프로미스를 이용해서 나만의 Axios 만들기


나만의 Axios를 만들어보자.
m_Axios.get('주소')를 호출하면 
리턴으로 백엔드에서 처리되고 난 값을 받게 코딩해주면 된다. 

```js

  const m_Axios = {
            get: (url) => { // 리턴으로 프로미스를 던저주자.  
                    const xmlHttpRequest = new XMLHttpRequest()
                    xmlHttpRequest.open("get", url)
                    xmlHttpRequest.send()
                    xmlHttpRequest.addEventListener("load", (res) => {
                        console.log(res.target.response)
                });
            },
            post: (url) => {

            }
        }
``` 
하지만 이렇게 하면 리턴값이 백엔드에서 처리될 시간을 주지 않아 에러가 나게된다.

## Axios도 사실은 프로미스

하지만 리턴값을 프로미스 객체로 하게되면 호출하고 난 후에 .then을 붙여서 응답 받은 값을 사용하게 할 수 있다.
```js
  const m_Axios = {
            get: (url) => { // 리턴으로 프로미스를 던저주자.
                return new Promise((resolve, reject)=>{
                    const xmlHttpRequest = new XMLHttpRequest()
                    xmlHttpRequest.open("get", url)
                    xmlHttpRequest.send()
                    xmlHttpRequest.addEventListener("load", (res) => {
                        resolve(res.target.response)
                    });
                });
            },
            post: (url) => {

            }
        }
        
```

프로미스를 기다려주는 방식은  .then을 붙이던지 await를 사용하자. 
await를 사용하면 예상한 순서대로 호출이 되기 때문에 더 유용한 면이 있다.

```js

        const onClick_m_Axios = async () => {
            console.log("OnClick_m_Axios")
            //Axios 요청하기
            // 1. .then 으로 받기 
            m_Axios.get("https://koreanjson.com/posts/1").then((res) => {
                console.log(".then으로 받은 것 : ", res)
            })


            // 2. await 로 응답받기 
            const result = await m_Axios.get("https://koreanjson.com/posts/1")
            console.log("await로 받은 것, : ", result)

        }
````
