const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors');
const template = require("./lib/template-loader");
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const blog = require('./controllers/blog')
const blogApi = require('./routes/blog')
const demoApi = require('./routes/demo1')
// error handler
onerror(app)

// middlewares

app.use(cors());
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// 注入模板加载器
app.use(template('views',{ 
  noCache: true, 
  watch: true
}));


// logger
app.use(async (ctx, next) => {
  await next()
  const ms = new Date()
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(blog.routes(), blog.allowedMethods())
app.use(demoApi.routes(), demoApi.allowedMethods())
app.use(blogApi.routes(), blogApi.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
