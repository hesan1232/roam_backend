//导入数据库模块
const db = require('../db')

//查询路由模块
exports.getRouter = (req, res) => {
    const searchInfo=req.query
    let selectSql = 'select id,title,routingPath,componentPath,menuIcon,url from router where permissions >= ?'
    
    db.query(selectSql, [req.user.type], (err, result) => {
        if (err) {
            return res.cc(err)
        }    
         res.cc('请求成功', 200, result)
         
             
    })
}

//更新评论信息
exports.updateInteractById = (req, res) => {
    const interactInfo = req.body
    const updateSql = 'update interact set comments= ? where id=? '
    db.query(updateSql, [interactInfo.comments,interactInfo.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.cc('更新成功', 200)
    })

}
