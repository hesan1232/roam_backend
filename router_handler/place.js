//导入数据库模块
const db = require('../db')

//获取全部地点列表
exports.getAllPlace = (req, res) => {
    const selectSql='select * from place'
    db.query(selectSql,(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        res.cc('请求成功',200,result)
    })
}
//分页查询列表
exports.getPlaceList = (req, res) => {
    const searchInfo={
        page:(req.query.page-1)*req.query.size,
        size:req.query.size*1
    }
    const selectSql='select * from place limit ?,?'
    db.query(selectSql,[searchInfo.page,searchInfo.size],(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        const selectAllSql='select * from place'
        db.query(selectAllSql,(e,AllList)=>{
            if (err) {
                return res.cc(err)
            }
            res.cc('请求成功',200,{placeList:result,total:AllList.length})   
        })
        
    })
}
//通过地点名字地点详细信息
exports.getPlaceByPlaceName = (req, res) => {
    const selectSql='select * from place where placeName like ?'
    db.query(selectSql,`%${req.query.placeName}%`,(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        res.cc('请求成功',200,result)
    })
    
}
//根据地点id获取具体信息
exports.getPlaceById = (req, res) => {
    const selectSql='select * from place where id = ?'
    db.query(selectSql,req.query.id,(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        res.cc('请求成功',200,result)
    })
    
}
//返回所地点类型
exports.getPlaceTypeList = (req, res) => {
    const selectSql='select id,placeType from place where id in (select max(id) from place group by  placeType ) '
    db.query(selectSql,(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        res.cc('请求成功',200,result)
    })
    
}
//根据地点类型地点列表

exports.getPlaceListByPlaceType = (req, res) => {
    const selectSql='select * from place where placeType = ?'
    db.query(selectSql,req.query.placeType,(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        res.cc('请求成功',200,result)
    })
    
}

//增加地点信息
exports.addPlace = (req, res) => {
    const placeInfo=req.body
    const insertSql='insert into place set ?'
    db.query(insertSql,placeInfo,(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        res.cc('更新成功',200)
    })
    
}

//更新地点信息
exports.updatePlaceListById = (req, res) => {
    const placeInfo=req.body
    const updateSql='update place set placeName= ? ,placeType= ? , placeX = ?,placeY = ?,description= ? ,ImgUrl= ? where id=? '
    db.query(updateSql,[placeInfo.placeName,placeInfo.placeType,placeInfo.placeX,placeInfo.placeY,placeInfo.description,placeInfo.ImgUrl,req.body.id],(err,result)=>{
        if (err) {
            return res.cc(err)
        }
        res.cc('更新成功',200)
    })
    
}

//根据id删除地点
exports.deletePlaceListById = (req, res) => {
    const selectSql='select * from place where id = ?'
    db.query(selectSql,req.body.id,(e,selectResult)=>{
        if (e) {
            return res.cc(e)
        }
        if(selectResult.length){
            const deleteSql='delete from place  where id=? '
            db.query(deleteSql,req.body.id,(err,result)=>{
                if (err) {
                    return res.cc(err)
                }
                return res.cc('删除成功',200)
            })
           
        } 
        res.cc('删除失败',401,selectResult)
        
    })
       
    
}
