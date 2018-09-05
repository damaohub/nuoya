const router = require('koa-router')()
const userController = require('../controllers/apis/users')
const indexController = require('../controllers/apis/index') 
router.prefix('/api')

router.post('/orders',indexController.getOrders)
      .post('/history-orders',indexController.historyOrders)
      .post('/complain',indexController.complainList)
      .post('/bill',indexController.billList)



/* users*/
router.post('/regist', userController.addUser)
  .post('/login',userController.login)
  .post('/info', userController.getUser)
  .post('/logout',userController.logout)



module.exports = router
