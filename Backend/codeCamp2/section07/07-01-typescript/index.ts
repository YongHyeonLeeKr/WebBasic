let aaa = '안녕하세요'
aaa= 3


// 타입 명시가 필요한 상황
let ccc:(string | number) = 1000
ccc= '1000원 '

// 숫자 타입
let ddd : number = 11234
ddd = 3355;

// 불리언
let booleannType : boolean = false

// 배열 타입
let arrayType : number[] = [1,23,4,24,12,512,]

// 객체타입
interface IProfile {
    name: string,
    age: number | string,
    school : string,
    hobby? : string,
}
const profile: IProfile = {
    name: '철수',
    age : 8,
    school: '다람쥐초등학교'
}
