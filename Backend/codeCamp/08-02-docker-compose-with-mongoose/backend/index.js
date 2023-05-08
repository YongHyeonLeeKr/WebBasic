import express, { response } from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js'
import cors from 'cors'
import 'dotenv/config'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js'
import mongoose from 'mongoose'
import {Board} from './models/board.model.js'



const app = express();
app.use(cors())

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get('/boards', async (req, res) => {
    // 1. 데이터를 조회 하는 로직 -> DB 에 접속하여 데이터 꺼내오기
    //const result = [
    //    {number: 1, writer: "철수", titile: "제목입니다~~", contents: "철수 내용"},
    //    {number: 1, writer: "철수", titile: "제목입니다~~", contents: "철수 내용"},
    //    {number: 1, writer: "철수", titile: "제목입니다~~", contents: "철수 내용"},
    //]
    // 2. 꺼내온 결과 응답 주기
    
    const result = await Board.find()
    res.send(result)
})



app.post('/boards', async (req, res) =>{
    console.log(req.body)
    // 1. 데이터를 등록하는 로직 => DB에 접속 => 데이터 저장
    const board = new Board ({
        writer : req.body.writer,
        title: req.body.title,
        contents: req.body.contents
    })

    await board.save();
    // 2. 저장 결과 응답 주기

    res.send("잘 저장 됐습니다.")

})





app.post('/tokens/phone', (req,res) => {

    const myphone= req.body.phoneNumber
    const token = getToken();

    checkValidationPhone(myphone)
    console.log(myphone, token)
    sendTokenToSMS(myphone, token);

    res.send(`${myphone}: 인증완료!`)
})


app.post("/users", (req,res) => {

    const user = req.body.myuser

    // 1. 이메일이 정산인지 여부 

    const isValid = checkValidationEmail(user.email)
    if(isValid){
        //2. 가입환영 템플릿 만들기
        const mytemplate = getWelcomeTemplate(user)
        // 3. 이메일에 가입환영 템플릿 전송
        sendTemplateToEmail(user.email, mytemplate)
        res.send("가입완료!")
    }

})


// 몽고DB 접속
mongoose.connect("mongodb://my-database:27017/mydocker")

app.listen(3001, () => {
    console.log(`Example app listening on port ${3001}`)
})