# await의 작동원리 (Microque)


``` js
        const onClickMicroAwait = () => {
            console.log('________시작__________') // 1

            function func1() {
                console.log('func1 시작')  // 2
                func2();
                console.log('func1 끝') // 4
            }

            async function func2() {
                console.log('func2 시작') // 3
                const friend = await "철수"; // 6
                console.log(friend);
            }

            func1();

            console.log('________끝__________') // 5
            
        }

```
이 함수의 실행순서는 다음과 같다 
```js
________시작__________
 func1 시작
 func2 시작
 func1 끝
________끝__________
 철수
```

func2의  'const friend = await "철수";' 가 await를 만나면 실행컨텍스트상 마이크로 큐에 들어가기 때문이다.

실행 컨텍스트의 마이크로큐에 대한 개념이 잡혀있지 않으면 
await 실행순서가 예측되지 않기 때문에 
microque와  await를 만나면 microque에 들어 간다는 점을 잘 기억하도록 하자. 