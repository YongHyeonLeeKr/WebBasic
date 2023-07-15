const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const User = require('../models/user')


module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', // req.body.email 
        passwordField: 'password', // req.body.password 
    }, async(email, password, done) => { 
        try {
         const exUser = await User.findOne({where: { email }})
         if(exUser){
             // 가입한 상태
             // 입력한 비밀번호와 DB의 해쉬화된 비밀번호와 비교 
            const result = await bcrypt.compare(password, exUser.password)
            if(result) {
                // 일치
                done(null, exUser)
            } else { 
                // 일치 하지 않으면
                done(null, false, { message: '비밀번호가 일치하지 않습니다.'}) 
            }
         } else {
             // 가입하지 않은 상태
             done(null, false, { message: '가입되지 않은 회원입니다.'})
         }
        } catch (error) {
            
        }
    }))
}