

// node 
/*
console.log(this) // {}
const x = 0; 
module.exports.x = x;
console.log(this) // { x : 0 }
 */

//console.log(globalThis) // {} 글로벌 객체

// 브라우저


// 함수에서의 this 
function checkThis() {
    console.log(this)
}
//checkThis()



/* 동적 바인딩

function Man(name){
    this.name = name;
    this.printName = function () {
        console.log(`나는 남자고 , 내 이름은 ${this.name}`) // 앞으로 생성될 '인스턴스 자체'를 가리키게 됨 
    }
}


function Woman(name){
    this.name = name;
    this.printName = function () {
        console.log(`나는 여자고 , 내 이름은 ${this.name}`) // 앞으로 생성될 '인스턴스 자체'를 가리키게 됨 
    }
}

const Noah = new Man('noah')
const Hailey = new Woman('hailey')


Noah.printName = Hailey.printName
Noah.printName() // hailey
Hailey.printName() // hailey 

function sayHi(printName){
    console.log("안녕? 반가워")
    printName()  // caller(object.printName) 없이 호출만 하므로 this는 undefined
}

sayHi(Noah.printName)

*/

function Man(name){
    this.name = name;
    this.printName = function () {
        console.log(`나는 남자고 , 내 이름은 ${this.name}`) 
    }
    this.printName = this.printName.bind(this) // bind를 활용하여 정적 바인딩
}


function Woman(name){
    this.name = name;
    this.printName = () => {
        console.log(`나는 여자고 , 내 이름은 ${this.name}`) // 앞으로 생성될 '인스턴스 자체'를 가리키게 됨 
    }
}

const Noah = new Man('noah')
const Hailey = new Woman('hailey')


Noah.printName() // 나는 남자고 , 내 이름은 noah
Hailey.printName() // hailey 

function sayHi(printName){
    console.log("안녕? 반가워")
    printName()  // caller(object.printName) 없이 호출만 하므로 this는 undefined
}

sayHi(Noah.printName) // 정적 바인딩 된 함수 자체를 넘겨주므로, "나는 남자고 , 내 이름은 noah" 출력
