import express from "express"
import { CashService } from './mvc/controllers/services/cash.service';
import { CouponController } from './mvc/controllers/coupon.controller';
import { ProductController } from './mvc/controllers/product.controller';


const app = express();

// 상품 구매하기


const productController = new ProductController()

// 상품 구매하기 
app.post("/products/buy", productController.buyProduct)

// 상품 환불하기
app.post("/products/refund", productController.refundProduct)


// 쿠폰(상품권) API
const couponController = new CouponController()
app.post("/coupons/buy", couponController.buyCoupon)


app.listen(3000)