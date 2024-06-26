import express from "express"
import { CashService } from './mvc/controllers/services/cash.service.js';
import { CouponController } from './mvc/controllers/coupon.controller.js';
import { ProductController } from './mvc/controllers/product.controller.js';
import { ProductService } from './mvc/controllers/services/product.service.js';
import { PointService } from './mvc/controllers/services/point.service.js';


const app = express();

const productService = new ProductService();
const cashService = new CashService();
const poinstService = new PointService

// 상품 API
const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct)
app.post("/products/refund", productController.refundProduct)


// 쿠폰(상품권) API
const couponController = new CouponController(poinstService)
app.post("/coupons/buy", couponController.buyCoupon)

app.listen(3000)