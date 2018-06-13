const router = require('koa-router')()
var userController = require('../controllers/users')
var postController = require('../controllers/posts')
var saltMd5 = require('../util/saltMD5')
var status = require('../util/resTemplate') 
router.prefix('/api')

/* users*/
router.post('/regist', async (ctx, next) => {
  let data = await userController.addUser(ctx, next)
  ctx.response.type = 'application/json'
  ctx.body = { data: data }
})
router.post('/login',async(ctx,next) => {

  try {
    let data = await userController.login(ctx, next)
    ctx.body = data;
  } catch (e) {
    status.catchError(ctx, e.code, e.message);  
  }
   
})

router.get('/info', async (ctx, next) => {
    let info = await userController.getUserInfo(ctx, next)
    ctx.body = info;
})
router.post('/logout',async (ctx, next) => {
  let data = await userController.logout(ctx,next)
 ctx.body = data

})


/*articles*/
router.get('/article/posts', async (ctx, next) => {
  let data = await postController.getPostByAuthor(ctx, next)
  ctx.body = data
})
router.get('/article/detail', async (ctx, next) => {
  let data = await postController.getPost(ctx, next)
  ctx.body = data
})

router.post('/article/create',async (ctx, next) => {
  let data = await postController.createPost(ctx, next)
  ctx.body = data
})
router.post('/article/update', async (ctx, next) => {
  let data = await postController.updatePost(ctx, next)
  ctx.body = data
})
router.post('/article/delete', async (ctx, next) => {
  let data = await postController.deletePost(ctx, next)
  ctx.body = data
})

router.post('/article/upstat', async (ctx, next) => {
  let data = await postController.updateStatus(ctx, next)
  ctx.body = data
})

module.exports = router
