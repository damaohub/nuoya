# koa2-site
## koa2 + sequelize + nunjucks/api(可以自定义restfull风格)

目录结构：  

├─bin  --启动服务   
├─config  --各种配置文件  
│  └─database  --数据库配置文件  
├─controllers  --控制器C   
│  └─apis  --接口的控制器（解耦api接口和传统网页渲染）   
├─lib  --自定义库文件  
├─models  --模型M ，通过ORM（sequelize）定义数据模型   
├─public  --web入口  
├─routes  --路由文件  
├─services  --通过ORM进行CURD等,为控制器提供数据对象（链接M和C）  
├─util  -- 辅助库   
└─views  -- 视图V （采用了nunjucks渲染视图）   
&nbsp; &nbsp; └─partion  --局部模板  