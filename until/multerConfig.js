const multer = require('multer')
const path = require('path') 
const handlePath = (dir) => {

    return path.join(__dirname, './', dir)
  }

const storage = multer.diskStorage({
    // 3.1 存储路径
    destination: function(req, file, cb) {
        cb(null, handlePath('../../../backend/roam_backend/public'))
    },
    //  3.2 存储名称
    filename: function (req, file, cb) {
     
      // 将图片名称分割伪数组，用于截取图片的后缀
    const fileFormat = file.originalname.split('.')
    // 自定义图片名称
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
  })
const fileFilter= (req, file, cb)=> {
    const fileFilter = ['.jpg','.jpeg','.png','.tiff','.gif','.bmp'];
    if (!(fileFilter.includes(path.extname(file.originalname)))) {
      return cb(new Error('服务器只接受jpg、jpeg、png、tiff、gif、bmp的图片文件，请检查您所上传文件的格式'),false);
    }
    // console.log(req, file)
    cb(null, true);
  }
// 4. 为 multer 添加配置
const multerConfig = multer({
    storage,
    limits: {
        files: 5, // allow up to 5 files per request,
        fileSize: 1048576, // 1 Mb
    },
    fileFilter
})

module.exports = multerConfig

