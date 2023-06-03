

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

이 함수를 실행순서는 어떻게 될까? 
