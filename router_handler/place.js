//导入数据库模块
const db = require('../db')

//获取全部地点列表
exports.getAllPlace = (req, res) => {
    const selectSql = 'select * from place'
    db.query(selectSql, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.cc('请求成功', 200, result)
    })
}
//分页查询列表
exports.getPlaceList = (req, res) => {
    const searchInfo=req.query
    const searchList=[]
    const resDate={}
    let selectSql = 'select * from place where 1=1'
    if(searchInfo.placeName){
        selectSql+=' and placeName like ? '
        searchList.push(`%${req.query.placeName}%`)   
    }
    if(searchInfo.placeType){
        selectSql+=' and placeType= ?'
        searchList.push(searchInfo.placeType)   
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
                resDate.placeList=result
                res.cc('请求成功', 200, resDate)
            })  
        }      
    })
}
//通过地点名字地点详细信息
exports.getPlaceByPlaceName = (req, res) => {
    const selectSql = 'select * from place where placeName like ?'
    db.query(selectSql, `%${req.query.placeName}%`, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.cc('请求成功', 200, result)
    })

}
//根据地点id获取具体信息
exports.getPlaceById = (req, res) => {
    const selectSql = 'select * from place where id = ?'
    db.query(selectSql, req.query.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.cc('请求成功', 200, result)
    })

}
//返回所地点类型
exports.getPlaceTypeList = (req, res) => {
    const selectSql = 'select id,placeType from place where id in (select max(id) from place group by  placeType ) '
    db.query(selectSql, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.cc('请求成功', 200, result)
    })

}
//根据地点类型地点列表

exports.getPlaceListByPlaceType = (req, res) => {
    const selectSql = 'select * from place where placeType = ?'
    db.query(selectSql, req.query.placeType, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.cc('请求成功', 200, result)
    })

}

//增加地点信息
exports.addPlace = (req, res) => {
    const placeInfo = req.body
    const insertSql = 'insert into place set placeName= ? ,placeType= ? , placeX = ?,placeY = ?,description= ? ,ImgUrl= ?'
    db.query(insertSql, [placeInfo.placeName, placeInfo.placeType, placeInfo.placeX, placeInfo.placeY, placeInfo.description, placeInfo.ImgUrl, req.body.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.cc('更新成功', 200)
    })

}

//更新地点信息
exports.updatePlaceById = (req, res) => {
    const placeInfo = req.body
    const updateSql = 'update place set placeName= ? ,placeType= ? , placeX = ?,placeY = ?,description= ? ,ImgUrl= ? where id=? '
    db.query(updateSql, [placeInfo.placeName, placeInfo.placeType, placeInfo.placeX, placeInfo.placeY, placeInfo.description, placeInfo.ImgUrl, placeInfo.id], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        res.cc('更新成功', 200)
    })

}

//根据id删除地点
exports.deletePlaceById = (req, res) => {
    const selectSql = 'select * from place where id = ?'
    db.query(selectSql, req.body.id, (e, selectResult) => {
        if (e) {
            return res.cc(e)
        }
        const deleteSql = 'delete from place  where id=? '
        db.query(deleteSql, req.body.id, (err, result) => {
            if (err) {
                return res.cc(err)
            }
            return res.cc('删除成功', 200)
        })
    })
}
