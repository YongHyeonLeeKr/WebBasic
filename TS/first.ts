let str : string = " asdlkvnalsv"
console.log(str)



/** 타입 선언방법1 */
let add1: (x: number, y:number) => number = (x,y) => x + y;
let result = add1(1,3)
/** 타입 선언방법 2 */
type Add2 = (x: number, y:number) => number;
const add: Add2 = (x,y) => x + y 
/** 타입 선언방법3 */
interface Add {
    (x:number, y:number): number;
}
/** 배열 타입 선언 방법 */
const arr: string[] = ['asdf', 'asdfasvdjnsa']
const arr2: number[] = [123,1123124124]
/** 객체 타입 선언 방법 */
const obj: { lat: number, lon: number} = {lat: 37.5, lon: 127.5}
/** 길이가 고정된 배열 -> 튜플  */
const arr3: [number, number, string] = [123,123,"asd"]