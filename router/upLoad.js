const express = require('express')

const router = express.Router()

const handler = require('../router_handler/upLoad')

//单个图片文件上传
router.post('/upLoad/image', handler.upLoadImg)

module.exports = router