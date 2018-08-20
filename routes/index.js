const router = require('koa-router')()
const demoControler = require('../controllers/demo')
router.get('/', demoControler.index)
router.get('/string', async (ctx, next) => {
  ctx.response.body = 'koa2 string'
})




module.exports = router
