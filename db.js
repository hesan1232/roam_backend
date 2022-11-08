const mysql=require('mysql')

const db=mysql.createPool({
    //链接数据库的ip地址（本机）
    host:'127.0.0.1',
    //数据库用户名密码
    user:'root',
    password:'itcast',
    //连接数据库名字
    database:'test'
})
module.exports=db