
export class CouponController {

  constructor(moneyservice){
    this.moneyservice = moneyservice;
  }

  buyCoupon = (req, res) => {
    // 1. 가진 돈 검증하는 코드 (10줄 => 2줄)
    //const cashService = new CashService()
    const hasMoney = this.moneyservice.checkValue(); // true 또는 false 리턴
    // 2. 쿠폰 구매하는 코드
    if (hasMoney) {
      res.send("쿠폰 구매 완료!!");
    }
  };
}

