// 引入配置好的 multerConfig
const multerConfig = require('./multerConfig')
const fs = require('fs')
const path = require('path')
// 上传到服务器地址
const { BaseURL, imgPath } = require('./serverConfig')

const handlePath = (dir) => {

    return path.join(__dirname, './', dir)
}
// 对图片进行去重删除和重命名
const hanldeImgDelAndRename = (filename, dirPath) => {
    // TODO 查找该路径下的所有图片文件
    fs.readdir(dirPath, (err, files) => {
        console.log(files)
        for (let i in files) {
            // 当前图片的名称
            const currentImgName = path.basename(files[i])
            // 图片的名称数组：[时间戳, id, 后缀]
            const imgNameArr = currentImgName.split('.')
            const filenameArr = filename.split('.')
            // TODO 先查询该id命名的文件是否存在，有则删除
            if (imgNameArr[0] === filenameArr[0]) {
                const currentImgPath = dirPath + '/' + currentImgName
                fs.unlink(currentImgPath, (err) => { })
            }

            // TODO 根据新存入的文件名(时间戳.jpg)，找到对应文件，然后重命名为: 时间戳.id.jpg
            if (currentImgName === filename) {
                const old_path = dirPath + '/' + currentImgName
                const new_path = dirPath + '/' + imgNameArr[0] + '.' + path.extname(files[i])
                // 重命名该文件
                fs.rename(old_path, new_path, (err) => { })
            }
        }
    })
}


// 封装上传图片的接口
function uploadImage(req, res) {
    return new Promise((resolve, reject) => {
        multerConfig.single('file')(req, res, function (err) {
            if (err) {
                // 传递的图片格式错误或者超出文件限制大小，就会reject出去
                reject(err)
            } else {
                // hanldeImgDelAndRename(req.file.filename, handlePath('../../../backend/roam_backend/public'))
                const { file } = req
                fs.renameSync(file.path, `public/${file.originalname}`)
                file.path = `public/${file.originalname}`
                // 拼接成完整的服务器静态资源图片路径

                resolve(BaseURL + imgPath + file.originalname)
            }
        })
    })
}

module.exports = {
    uploadImage
}
