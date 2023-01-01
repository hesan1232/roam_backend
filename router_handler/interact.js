//导入数据库模块
const db = require('../db')

//分页查询列表
exports.getInteractList = (req, res) => {
    const searchInfo=req.query
    const searchList=[]
    const resDate={}
    let selectSql = 'select * from interact where 1=1'
    if(searchInfo.placeName){
        selectSql+=' and placeName like ? '
        searchList.push(`%${req.query.placeName}%`)   
    }
    if(searchInfo.userName){
        selectSql+=' and userName= ?'
        searchList.push(searchInfo.userName)   
    }

    db.query(selectSql, searchList, (err, result) => {
        if (err) {
            return res.cc(err)
        }  
        resDate.total=result.length
        if(searchInfo.page&&searchInfo.size){
            selectSql=selectSql.concat(' limit ?,?')
            searchList.push((searchInfo.page - 1) * searchInfo.size)
            searchList.push(searchInfo.size* 1)  
            db.query(selectSql, searchList, (err, result) => {
                if (err) {
                    return res.cc(err)
                }  
                resDate.interactList=result
                res.cc('请求成功', 200, resDate)
            })  
        }      
    })
}

//增加评论信息
exports.addInteract = (req, res) => {
    const interactInfo = req.body
    const insertSql = 'insert into interact set userName= ? ,comments= ? '
    db.query(insertSql, [req.user.userName, interactInfo.comments], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.cc('更新成功', 200)
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
//根据id删除地点
exports.deleteInteractById = (req, res) => {
    const selectSql = 'select * from interact where id = ?'
    db.query(selectSql, req.body.id, (e, selectResult) => {
        if (e) {
            return res.cc(e)
        }
        const deleteSql = 'delete from interact  where id=? '
        db.query(deleteSql, req.body.id, (err, result) => {
            if (err) {
                return res.cc(err)
            }
            return res.cc('删除成功', 200)
        })
    })
}
