const express=require('express')

const router=express.Router()

const placeHandler=require('../router_handler/place')

//获取全部地点列表
router.get('/place/getAllPlace',placeHandler.getAllPlace)

//分页查询地点信息列表
router.get('/place/getPlaceList',placeHandler.getPlaceList)

//通过名字模糊查询获取地点详细信息
router.get('/place/getPlaceByPlaceName',placeHandler.getPlaceByPlaceName)

//根据id获取地点的详细信息
router.get('/place/getPlaceById',placeHandler.getPlaceById)
//获取地点类型 
router.get('/place/getPlaceTypeList',placeHandler.getPlaceTypeList)
//根据地点类型查询地点列表 
router.get('/place/getPlaceListByPlaceType',placeHandler.getPlaceListByPlaceType)

//增加地点
router.post('/place/addPlace',placeHandler.addPlace)
//根据id更新数据
router.post('/place/updatePlaceListById',placeHandler.updatePlaceListById)
//根据id删除地点
router.post('/place/deletePlaceListById',placeHandler.deletePlaceListById)

module.exports=router