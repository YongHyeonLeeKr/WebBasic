const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

const router = express.Router()

router.post('/join', isNotLoggedIn , async (req,res,next)=> {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({where: { email }})
        if(exUser){ // 이전에 회원가입 했다면
        return res.redirect('/join?error=exist')
        }
        // 신규유저라면 비밀번호 해쉬화해서 회원가입 
        const hash = await bcrypt.hash(password, 12) 
        await User.create({
        email,
        nick,
        password: hash,
    })
    return res.redirect('/'); // 메인 페이지로 돌려 보내기 
    } catch (error) {
        console.error(error)
        return next(error)
    }
})

// 로그인 로직은 더 복작해서 passport 를 씀
router.post('/login', isNotLoggedIn , (req,res,next)=> {
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            console.log(authError)
            return next(authError)
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`)
        }

        return req.login(user, (loginError)=> {
            if(loginError) {
                console.error(loginError);
                return next(loginError)
            }
            // 세션 쿠키를 브라우저로 전송 
            return res.redirect('/') // 로그인 성공 
        })
    })(req,res,next); 
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(); // 세션 쿠키 사라짐 
    req.session.destroy(); // 세션 자체를 파괴
    res.redirect('/');
})

router.get('/kakao', passport.authenticate('kakao'))


//카카오 어쓰에서 로그인 성공시 여기로 
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect:'/',
}), (req,res) =>{
    res.redirect('/')
})

module.exports = router;