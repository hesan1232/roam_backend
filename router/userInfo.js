const express=require('express')

const router=express.Router()

const userInfoHandler=require('../router_handler/userInfo')

//获取用户信息
router.get('/userInfo/getUserInfo',userInfoHandler.getUserInfo)

//根据用户类型区分用户权限 getUserTypeByType
router.get('/userInfo/getUserTypeByType',userInfoHandler.getUserTypeByType)

//修改用户信息
router.post('/userInfo/updateUserInfo',userInfoHandler.updateUserInfo)

//获取权限列表
router.get('/userInfo/getMenuList',userInfoHandler.getMenuList)

//删除用户
router.post('/userInfo/deleteUserInfo',userInfoHandler.deleteUserInfo)


module.exports=router