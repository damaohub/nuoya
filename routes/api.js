const router = require('koa-router')()
const userController = require('../controllers/apis/users')
const indexController = require('../controllers/apis/index') 
router.prefix('/api')

router.post('/orders',indexController.getOrders)

/* users*/
router.post('/regist', userController.addUser)
  .post('/login',userController.login)
  .get('/info', userController.getUserInfo)
  .post('/logout',userController.logout)



module.exports = router
