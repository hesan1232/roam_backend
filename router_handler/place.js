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
    
    const searchList=[]
    let selectSql = 'select * from place where 1=1'
    if(req.query.placeType){
        selectSql+=' and placeType= ?'
        searchList.push(req.query.placeType)
        console.log(selectSql)
    }
    if(req.query.page&&req.query.size){
        selectSql=selectSql.concat(' limit ?,?')
        searchList.push((req.query.page - 1) * req.query.size)
        searchList.push(req.query.size* 1)
        console.log(selectSql)
    }
    
   console.log(selectSql)
    db.query(selectSql, searchList, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        const selectAllSql = 'select * from place'
        db.query(selectAllSql, (e, AllList) => {
            if (err) {
                return res.cc(err)
            }
            res.cc('请求成功', 200, { placeList: result, total: AllList.length })
        })

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
exports.updatePlaceListById = (req, res) => {
    const placeInfo = req.body
    const updateSql = 'update place set placeName= ? ,placeType= ? , placeX = ?,placeY = ?,description= ? ,ImgUrl= ? where id=? '
    db.query(updateSql, [placeInfo.placeName, placeInfo.placeType, placeInfo.placeX, placeInfo.placeY, placeInfo.description, placeInfo.ImgUrl, req.body.id], (err, result) => {
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
