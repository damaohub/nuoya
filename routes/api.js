const router = require('koa-router')()
const userController = require('../controllers/apis/users')

router.prefix('/api')
/* test */ 
router.get('/test',userController.test)
/* users*/
router.post('/regist', userController.addUser)
  .post('/login',userController.login)
  .get('/info', userController.getUserInfo)
  .post('/logout',userController.logout)


module.exports = router
