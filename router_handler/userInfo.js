//导入数据库模块
const db = require('../db')

//获取用户信息
exports.getUserInfo = (req, res) => {
    const selectSql='select id,userName,nickName,type,userAvater,password from user where id=?'
    db.query(selectSql,req.user.id,(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        res.cc('请求成功',200,result[0])
    })

}
//根据用户type查询用户类型
exports.getUserTypeByType = (req, res) => {
    const selectSql='select * from type where type = ?'
    db.query(selectSql,req.query.type,(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        res.cc('查询成功',200,result)
    })
    
}
//获取权限列表
exports.getMenuList = (req, res) => {
    res.send('ok')
    
}
//修改用户信息
exports.updateUserInfo = (req, res) => {
    const userInfo=req.body
    const updateSql='update user set userName= ? ,password= ? , nickName = ?,userAvater= ? where id=? '
    db.query(updateSql,[userInfo.userName,userInfo.password,userInfo.nickName,userInfo.userAvater,req.user.id],(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        res.cc('更新成功',200)
    })
    
}
//注销个人账号
exports.deleteUserInfo = (req, res) => {
    const updateSql='delete from user  where id=? '
    db.query(updateSql,[req.user.id],(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        res.cc('删除成功',200)
    })
    
}