# roam_backend
毕设的后台管理系统
# 后端项目使用说明

#### 准备工作
  需要本地mySQL数据库
  数据库：后端根目录下test.sql文件需要添加到自己数据库中

根目录中db.js

const mysql=require('mysql')

const db=mysql.createPool({

  *//链接数据库的ip地址（本机）*

  host:'127.0.0.1',

  *//数据库用户名密码*

  user:'root',

  password:'itcast',

  *//连接数据库名字*

  database:'test'

})

module.exports=db



#### 运行命令 node|nodemon .\app.js