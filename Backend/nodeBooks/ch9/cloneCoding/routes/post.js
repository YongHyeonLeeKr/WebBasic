const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const { Post, Hashtag } = require("../models")
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

try {
    fs.readSync('uploads')
} catch (error) {
    //console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다. ')
    //fs.mkdirSync('uploads')
}

/** multer 환경 설정  */
const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,cb){
            cb(null, 'uploads/')
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname)
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext)
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }

})

/** 이미지 업로드  */
router.post('/img', isLoggedIn, upload.single('img'), (req,res) => {
    console.log(req.file)
    res.json({ url: `/img/${req.file.filename}`}) // 이미지 경로와 게시글 동기화
})


/** 게시글 업로드 */
router.post('/', isLoggedIn, upload.none(), async (req,res,next)=>{
    try {

        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        })
        //해쉬태그 분리용 정규 표현식 \s 띄어쓰기 $
        const hasgtags = req.body.content.match(/#[^\s#]*/g)
        if(hasgtags){
            const result = await Promise.all(
                hasgtags.map(tag => {
                    return Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase() },
                    })
                }),
            )
            console.log(result)
            await post.addHashtags(result.map(r => r[0]))
        }
        res.redirect('/')
    } catch (error) {
        console.error(error)
        nextTick(error)
    }
})

module.exports = router 



