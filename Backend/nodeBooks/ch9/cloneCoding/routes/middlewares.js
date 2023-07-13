exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) { // 인증 성공 
        next() // 다음 미들 웨어 실행 
    } else { // 인증 비성공 
        res.status(403).send('로그인 필요'); // next 없으니 다음 미들웨어로 넘어가지 않고 종료 
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next()
    }else {
        const message = encodeURIComponent('로그인한 상태입니다.')
        res.redirect(`/?error${message}`)
    }
}