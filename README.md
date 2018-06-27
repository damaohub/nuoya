# koa2-site

## koa2 +mysql + sequelize + nunjucks/api(可以自定义restfull风格)
koa2，大量异步操作友好的ES7的async函数。  
要想熟悉一个框架那就是动手干，基于koa2搭建的mvc结构，从数据库到前端，对缓存有要求的可以添加redis等。

目录结构：  

├─bin  --启动服务   
├─config  --各种配置文件  
│  └─database  --数据库配置文件  
├─controllers  --控制器C   
│  └─apis  --接口的控制器（解耦api接口和传统网页渲染）   
├─lib  --自定义库文件  
├─models  --模型M ，通过ORM（sequelize）定义数据模型   
├─public  --web入口  
├─routes  --路由文件(调用相应路由，koa-router使api书写更灵活)  
├─services  --通过ORM进行CURD等,为控制器提供数据对象（链接M和C）  
├─util  -- 辅助库   
└─views  -- 视图V （采用了nunjucks渲染视图）   
&nbsp; &nbsp; └─partion  --局部模板  