//导入数据库模块
const db = require('../db')

//查询路由模块
exports.getRouter = (req, res) => {
    const searchInfo=req.query
    const searchList=[]
    const resDate={str:'请求路由了'}
    let selectSql = 'select * from interact where 1=1'
    if(req.user.type==0){
        res.cc('请求成功', 200, {
            type:"管理员",
            Router:[     
               {
                path:'individualManage',
                component:"IndividualManage",
                meta:{
                    title:'个人信息'
                }
               },
               {
                path:'personnelManage',
                component:"PersonnelManage",
                meta:{
                    title:'人员信息'
                }
               },
               {
                path:'placeManage',
                component:"PlaceManage",
                meta:{
                    title:'地点管理'
                }
               },
               {
                path:'commentsManage',
                component:"CommentsManage",
                meta:{
                    title:'评论管理'
                }
               },
            ]
    })
    }
   else{
        res.cc('请求成功', 200, {type:'普通用户'})
    }
    // db.query(selectSql, searchList, (err, result) => {
    //     if (err) {
    //         return res.cc(err)
    //     }  
    //     resDate.total=result.length
    //     if(searchInfo.page&&searchInfo.size){
    //         selectSql=selectSql.concat(' limit ?,?')
    //         searchList.push((searchInfo.page - 1) * searchInfo.size)
    //         searchList.push(searchInfo.size* 1)  
    //         db.query(selectSql, searchList, (err, result) => {
    //             if (err) {
    //                 return res.cc(err)
    //             }  
    //             resDate.interactList=result
    //             res.cc('请求成功', 200, resDate)
    //         })  
    //     }      
    // })
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
