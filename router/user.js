const express=require('express')

const router=express.Router()

const userHandler=require('../router_handler/user')

//引入验证规则
const {Joi,expressJoi}=require('../until/Joi')

const userReguserRule={
    body: {
        userName: Joi.string().alphanum().min(3).max(12).required(),
        password: Joi.string()
          .pattern(/^[\S]{6,15}$/)
          .required(),
        repassword: Joi.ref('password')
      }
}

//用户注册
router.post('/user/reguser',expressJoi(userReguserRule),userHandler.userReguser)

//用户登录
router.post('/user/login',expressJoi(userReguserRule),userHandler.userLogin)



module.exports=router