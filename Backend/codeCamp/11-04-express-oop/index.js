import express from "express"
import { CashService } from './cash';
import { ProductSevice } from './product';


const app = express();

// 상품 구매하기
app.post("/products/buy", (req,res) => {
    // 1. 가진 돈 검증 
    const cashServcie = new CashService()
    const hasMoney = cashServcie.checkValue() // true or false
    // 2. 판매여부 검증
    const productService = new ProductSevice()
    const  insSoldout = productService.checkSoldout()

    // 3. 상품 구매 if(돈 있음 && !판매완료)
    if(hasMoney && !insSoldout){
        res.send("상품 구매 완료!")
    }

    res.send("상품 구매 완료")
})


// 상품 환불하기
app.post("/products/refund", (req,res) => { 

    // 1. 판매여부 검증
    const productSevice = new ProductSevice()
    const isSoldout = productSevice.checkSoldout()
    //2. 상품 환불 코드
    if(isSoldout){
        res.send("상품환불완료")
    }
    

})

app.listen(3000)