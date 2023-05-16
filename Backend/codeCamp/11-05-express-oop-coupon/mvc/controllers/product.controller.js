import { CashService } from './services/cash.service'
import { ProductSevice } from './services/product.service'


export class ProductController {
    buyProduct = (req, res) => {
        // 1. 가진 돈 검증
        const moneyService = new CashService
        const hasMoney = moneyService.checkValue()
        // 2. 판매 여부 검즘
        const productService = new ProductSevice
        const isSoldout = productService.checkSoldout()
        // 3. 상품 구매 
        if(hasMoney && !isSoldout){
            res.send('상품을 구매합니다 ') 
        }
    }

    refundProduct = (req, res) => {
        //1. 판매여부 검증
        const productService = new ProductService()
        const isSoldout = productService.checkSoldout()
        // 2. 상품 환불 코드
        if(!isSoldout){
            res.send('상품을 환불합니다.')
        }
    }
}