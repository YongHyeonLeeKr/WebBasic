import { getToday } from './utils.js'
import nodemailer from 'nodemailer'
import 'dotenv/config'

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


export async function sendTemplateToEmail(myemail, mytemplate) {
    

    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_SENDER = process.env.EMAIL_SENDER;
    
    // 발신자 
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        }
    })

    //


    const result = await transporter.sendMail({
        from: EMAIL_SENDER,
        to: myemail,
        subject: "[노아] Nodejs서버로 보낸 이메일입니다. ",
        html: mytemplate
    })
    
    console.log(email + "이메일로 " + mytemplate + "를 전송합니다.")

    

}

