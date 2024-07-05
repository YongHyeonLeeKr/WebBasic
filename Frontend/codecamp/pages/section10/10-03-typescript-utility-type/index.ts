export interface IProfile {
    name: string
    age: number
    school:string
    hobby?: string
}


// 인터페이스 속성들이 다 nullaale로 바뀜 
type partialType = Partial<IProfile>
// 모든 속성의 null이 허용 안됨
type requiredType = Required<IProfile>

type pickType = Pick<IProfile, 'name' | 'age' >

type omitType = Omit<IProfile, 'hobby' >

type unionType = '엄마' | '아빠' | '아들' | '딸'

let familtyMember: unionType = '엄마'

type recordType = Record<unionType, IProfile> 

type unionFromInterface = keyof IProfile

const myProfile: unionFromInterface = 'school'

// type 과 interface의 차이는 ? -> 선언병합
// interface 는 선언 및 병합 가능 
export interface IProfile { 
    candy: number 
}


