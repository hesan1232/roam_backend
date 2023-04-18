//导入express模块
const express=require('express')
const app=express()
const multer=require('multer')
const path = require('path');
//对外暴漏静态资源
app.use("/public/", express.static(path.join(__dirname, "./public")));

//引入跨域包
const cors=require('cors')
app.use(cors())
// 配置跨域请求中间件(服务端允许跨域请求)
app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // 设置允许来自哪里的跨域请求访问（值为*代表允许任何跨域请求，但是没有安全保证）
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); // 设置允许接收的请求类型
  res.header("Access-Control-Allow-Headers", "Content-Type,request-origin"); // 设置请求头中允许携带的参数
  res.header("Access-Control-Allow-Credentials", "true"); // 允许客户端携带证书式访问。保持跨域请求中的Cookie。注意：此处设true时，Access-Control-Allow-Origin的值不能为 '*'
  res.header("Access-control-max-age", 10000); // 设置请求通过预检后多少时间内不再检验，减少预请求发送次数
  next();
})

//解析application/x-www-form-urlencoded数据
app.use(express.urlencoded({extended:false}))
//解析json字符串
app.use(express.json())

//分装一个res.cc函数
app.use((req,res,next)=>{
   //status 状态码
   //err 提示信息
   res.cc=function(msg,status=501,data={}){
      res.send({
        status,
        message:msg instanceof Error ? msg.message:msg,
        data,
      })
   }
   next()
})

//筛选那些不需要token认证
const expressJWT=require('express-jwt')
const tokenConfig=require('./until/tokenConfig')
app.use(expressJWT({secret:tokenConfig.jwtSecretKey}).unless({path:[/^\/api\/user\//]}))

const {Joi,expressJoi}=require('./until/Joi')
//引入路由
const userRouter=require('./router/user')
const userInfoRouter=require('./router/userInfo')
const placeRouter=require('./router/place')
const interactRouter=require('./router/interact')
const backendRouter=require('./router/backendRouter')
const bupLoadRouter=require('./router/upLoad')
//使用路由模块
app.use('/api',[userRouter,userInfoRouter,placeRouter,interactRouter,backendRouter,bupLoadRouter])

//全局错误中间件
app.use((err,req, res,next) =>{
    if(err.name==='UnauthorizedError') return res.cc('token失效，请重新登录',401)
    if (err instanceof Joi.ValidationError) {
      return res.cc(err.message,1)
    }
    if (err instanceof multer.MulterError) {
      return res.cc(err.message,501,{err})
    } 
     res.status(404).send("服务器发生了错误",404)
})

//开启  端口服务器
app.listen(80,()=>{
    console.log('api serve running at http://127.0.0.1')
})
