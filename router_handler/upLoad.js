//导入文件上传包
const multer=require('multer')

const {uploadImage} = require('../until/upload')
//上传单个图片

exports.upLoadImg =async  (req, res,) => {
    try {
        const imgUrl = await uploadImage(req, res)
        res.cc('上传成功',200,{
            imgUrl
        })
      } catch (error) {
        console.log(error instanceof multer.MulterError)
        res.cc('失败',502,{error})
      }
      console.log("小笼包在此！！");
    
}
