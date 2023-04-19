import { getToday } from './utils.js'

export function checkValidationEmail(email){
    if(email === undefined || !email.includes("@")) {
        console.log("에러발생!! 이메일을 제대로 입력해주세요! ")
        return false
    } else {
        return true
    }
}

/* 구조분해 할당을 통해서 받아줌 */
export function getWelcomeTemplate({name, age, school}) {
    
    // 백엔드 측에서 날짜 생성

    return `
    <html>
        <body>
            <h1>${name}님 가입을 환영합니다! </h1>
            <hr/>
            <div>이름: ${name}</div>
            <div>나이: ${age}살</div>
            <div>학교: ${school} </div>
            <div>가입일: ${getToday()} </div>
        </body>
    </html>
`
}


export function sendTemplateToEmail(email, mytemplate) {
    console.log(email + "이메일로 " + mytemplate + "를 전송합니다.")

}