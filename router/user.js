const express=require('express')

const router=express.Router()

const userHandler=require('../router_handler/user')

//用户注册
router.post('/user/reguser',userHandler.userReguser)

//用户登录
router.post('/user/login',userHandler.userLogin)



module.exports=router