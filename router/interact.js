const express=require('express')

const router=express.Router()

const interactHandler=require('../router_handler/interact')

//分页查询评论信息列表
router.get('/interact/getInteractList',interactHandler.getInteractList)
//增加评论
router.post('/interact/addInteract',interactHandler.addInteract)
//根据id更新数据
router.post('/interact/updateInteractById',interactHandler.updateInteractById)
//根据id删除地点
router.post('/interact/deleteInteractById',interactHandler.deleteInteractById)

module.exports=router