import express from 'express'
import {TwitterService} from '@/services'
const router = express.Router()

/** 使用中间件 */
router.use((req,res,next)=>{
    next()
})

router.get("/requestToken",async (req,res)=>{
    const {callback} = req.query
    const data =await TwitterService.requestToken()
    if(!data){
        res.send("error")
        return
    }
    res.redirect(`https://api.twitter.com/oauth/authorize?oauth_token=${data.oauth_token}`)
})

export default router