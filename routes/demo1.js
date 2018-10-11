const router = require('koa-router')()
const userController = require('../controllers/apis/users')
const demo1Controller = require('../controllers/apis/demo1') 
router.prefix('/api')

router.post('/orders',demo1Controller.getOrders)
      .post('/history-orders',demo1Controller.historyOrders)
      .post('/complain',demo1Controller.complainList)
      .post('/bill',demo1Controller.billList)
      .post('/withDraw', demo1Controller.withDraw)


/* users*/
router.post('/regist', userController.addUser)
  .post('/login',userController.login)
  .post('/info', userController.getUser)
  .post('/logout',userController.logout)



module.exports = router
