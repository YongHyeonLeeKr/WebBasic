const express = require('express')
const { isLoggedIn } = require('./middlewares')
const User = require('../models/user')
const router = express.Router()


// post /user/1/follow
router.post('/:id/follow', isLoggedIn, async(req,res,next)=> {
    try {
        const user = await User.findOne({where: {id: req.user.id}})
        if(user){
            // user가 req.params.id 번 사용자를 팔로잉 
            await user.addFollowing(parseInt(req.params.id, 10)) // setFollowings 수정
            res.send('success')
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router
