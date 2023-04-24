import express from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js'


const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get('/boards', (req, res) => {
    // 1. 데이터를 조회 하는 로직 -> DB 에 접속하여 데이터 꺼내오기
    const result = [
        {number: 1, writer: "철수", titile: "제목입니다~~", contents: "철수 내용"},
        {number: 1, writer: "철수", titile: "제목입니다~~", contents: "철수 내용"},
        {number: 1, writer: "철수", titile: "제목입니다~~", contents: "철수 내용"},
    ]
    // 2. 꺼내온 결과 응답 주기
    res.send(result)
})



app.post('/boards', (req, res) =>{
    console.log(req.body)
    // 1. 데이터를 등록하는 로직 => DB에 접속 => 데이터 저장

    // 2. 저장 결과 응답 주기

    res.send("게시물 등록에 성공하였습니다.")

})


app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
})


app.post('/tokens/phone', (req,res) => {

    res.send("인증완료!")
})