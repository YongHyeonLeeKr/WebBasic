

# 매크로큐(태스크규)와 마이크로 큐

```js

       console.log("onClickTaskQueuePriority 시작")
        
        // 비동기 함수 -> 매크로 큐(태스크 큐)
        setTimeout(()=>{
                    // 비동기 작업(마이크로큐)
            new Promise((resolve) => resolve("Promise(setTimeout)")).then(() => {
                console.log("Promise(setTimeout) : 마이크로큐, 0초후에 시작 예정")
            })
            console.log("초 후에 시작 될 setTimeout(테스크 큐) ")}, 0);
        
        // 비동기 작업(마이크로큐)
        new Promise ((resolve)=> resolve("Promise(1)")).then(()=>{
            console.log("Promise(1) : 마이크로큐, 0초후에 시작 예정")
        })
        
        setInterval(()=>{ console.log("0초 마다 실행될 setInterval(태크스 큐")}, 0 )

        let sum = 0;
        for(let i = 0 ; i <= 99999999; ++i) 
        {
            sum+=1;
        }
        console.log(sum);
                // 비동기 작업(마이크로큐)
         new Promise((resolve) => resolve("Promise(2)")).then(() => {
             console.log("Promise(2) : 마이크로큐, 0초후에 시작 예정")
         })
        console.log("onClickTaskQueuePriority 끝!")
    
    } 
```

이 함수를 실행순서는 다음과 같다.

``` js
onClickTaskQueuePriority 시작
100000000
onClickTaskQueuePriority 끝!
Promise(1) : 마이크로큐, 0초후에 시작 예정
Promise(2) : 마이크로큐, 0초후에 시작 예정
초 후에 시작 될 setTimeout(테스크 큐) 
Promise(setTimeout) : 마이크로큐, 0초후에 시작 예정
0초 마다 실행될 setInterval(태크스 큐
```

setTimeout(()=>{ 함수 }, 0) 이면 곧바로 실행되어야 하는데 Promise들이 먼저 실행된 것을 볼 수 있다.



매크로큐(테스트큐)와 마이크로큐 중 
마이크로 큐가 먼저 실행되고 
그 다음 매크로큐(테스크큐)가 실행된다.

우선 순위마 마이크로 큐에 있다는 것이 중요한데 
setTimeout과 같은 함수는 매크로 큐에 들어가기 때문에 먼저 실행 되더라도
마이크로 큐인 promise 들이 먼저 실행된 후에야 실행이 된다. 

심지어 setTimeout과 setInterval이 매크로 큐에 이미 들어와 있어 실행되는 중이 더라도
'setTimeout(()=>{ 로직 },0)' 의 로직이 Promise(마이크로 류)를 만난다면 Promise를 먼저 실행시키고
매크로 큐가 실행된다.


매크로큐(테스크 큐)와 마이크로 큐 개념을 모른다면 실행순서의 예측이 불가는 하다. 
그러니 구별하여 생각하는 연습을 많이 하도록 하자. 

