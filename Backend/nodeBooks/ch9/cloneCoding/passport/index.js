const passport = require('passport')
const local = require('./localStrategy') // email paswd 형식의 로그인 
const kakao = require('./kakaoStrategy') // 카카오로 로그인 
const User = require('../models/user')

module.exports = () => {

    // 브라우저와 user의 id만을 가지고 소통하면 유저를 식별하는 과정 

    passport.serializeUser((user, done) => {
        done(null,user.id) // 세션의 user id만 저장 
    })
    /// { id: 3, 'connect.sid': s%12412352356125}
    

    /** passport.session() 에서 브라우저에서 보내주는 cookie 알아낸 다음 deserializerUser실행   */
    passport.deserializeUser((id, done)=> {
        User.findOne({where: {id}})
            .then(user => done(null,user)) // req.user 라는 속성으로 접근할 수 있게 됌 
            .catch(err => done(err))
    })

    local() // locaStrategy 등록
    kakao() // kakaoStrategy 등록 
}