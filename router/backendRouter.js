const express=require('express')

const router=express.Router()

const routerHandler=require('../router_handler/backendRouter')

//分页查询评论信息列表
router.get('/router/getRouter',routerHandler.getRouter)


module.exports=router