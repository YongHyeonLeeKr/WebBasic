
# Function과 Arrow Functino(화살표함수)의 차이 

this가 누구의 것이냐? 

화살표 함수가 Functiion을 완전히 대체할 수 없는 이유는 
자신만의 this를 갖기 때문이다.



``` js
var relationship1 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends: function () {
    var that = this; // relationship1을 가리키는 this를 that에 저장
    this.friends.forEach(function (friend) {
      console.log(that.name, friend);
    });
  },
};
relationship1.logFriends();

```
일반 Function에서의 this는 호출한 부모객체의 this와는 별개이다.
부모의 this를 쓰려면 that에 부모의 this를 할당한 다음 사용한다. 


화살표 함수의 경우 

```js

const relationship2 = {
  name: 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends() {
    this.friends.forEach(friend => {
      console.log(this.name, friend); // this  == parent's this
    });
  },
};
relationship2.logFriends();

```

결국 자기만의 this를 갖고 싶다면 일반 Function을 사용하자.
대표적인 경우는 html 태그에 이벤트를 달아주는 경우이다.

```js
button.addEventListener('click', function(){
  console.log(this.textContent) // 버튼 자체(this)에 달려있는 텍스트 출력
})
```

하지만 이것을 화살표 함수로 바꾸면 
```js
button.addEventListener('click', () => {
  console.log(this.textContent) // this는 버튼의 this가 아닌 바깥쪽 this이므로 출력 X
})
```


결국 화살표함수를 써주려면 this 대신에 
e(이벤트)를 인자로 받아 타겟을 특정해주어야 한다. 

```js
button.addEventListener('click', (e) => {
  console.log(e.target.textContent) // this는 버튼의 this가 아닌 바깥쪽 this이므로 출력 X
})
```
