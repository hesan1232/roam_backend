//导入express模块
const express=require('express')
const app=express()

//对外暴漏静态资源
app.use(express.static('public'))
//引入跨域包
const cors=require('cors')
app.use(cors())

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
//使用路由模块
app.use('/api',[userRouter,userInfoRouter,placeRouter,interactRouter])

//全局错误中间件
app.use((err,req, res,next) =>{
    if(err.name==='UnauthorizedError') return res.cc('token失效，请重新登录',401)
    if (err instanceof Joi.ValidationError) {
      return res.cc(err.message,1)
    }
     res.status(404).send("服务器发生了错误",404)
})

//开启  端口服务器
app.listen(80,()=>{
    console.log('api serve running at http://127.0.0.1')
})
