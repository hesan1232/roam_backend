//导入路由模块
const db = require('../db')

const { Base64 } = require('js-base64')
//token生成与解密

const jwt = require('jsonwebtoken')
const tokenConfig = require('../until/tokenConfig')
exports.userReguser = (req, res) => {
    const userInfo = req.body
    const selectSql = 'select * from user where userName=?'
    db.query(selectSql, [userInfo.userName], (err, result) => {
        if (err) {
            return res.cc('数据库查询失败', 501)
        }
        if (result.length > 0) {
            return res.cc('该用户已经存在', 201)
        }
        const insertUserSql = 'insert into user set ?'
        db.query(insertUserSql,
            { userName: userInfo.userName, 
                password: userInfo.password,
                type:1,
                nickName:'用户'+Math.random().toString(36).slice(2,8) },
            (err, result) => {
                if (err) {
                    return res.cc('数据库操作失败', 501)
                }
                if (result.affectedRows !== 1) {
                    return res.cc('用户注册失败', 501)
                }
                return res.cc('注册成功', 200)
            })
    })


}
exports.userLogin = (req, res) => {
    const userInfo = req.body
    const selectSql = 'select * from user where userName=?'
    db.query(selectSql, [userInfo.userName], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length > 0) {
            const user = result[0]
            if (user.password !== userInfo.password) {
                return res.cc('密码输入错误', 201)
            } else {
                const tokenStr = jwt.sign(
                    { ...user, password: '', userAvater: '' }, tokenConfig.jwtSecretKey, {
                    expiresIn: '4h'
                })
                return res.send({
                    status: 200,
                    message: '登录成功', 
                    token:"Bearer "+ tokenStr
                })
            }

        }
    })
}
