const router = require('koa-router')()
const userController = require('../controllers/apis/users')
const postController = require('../controllers/apis/posts')

router.prefix('/api')

/* users*/
router.post('/regist', userController.addUser)
  .post('/login',userController.login)
  .get('/info', userController.getUserInfo)
  .post('/logout',userController.logout)


/*articles*/
router.get('/article/posts', postController.getPostByAuthor)
  .get('/article/detail', postController.getPost)
  .post('/article/create', postController.createPost)
  .post('/article/update', postController.updatePost)
  .post('/article/delete', postController.deletePost)
  .post('/article/upstat', postController.updateStatus)
  .get('/article/post-tags', postController.getTagsBypost)

// tag
router.get('/tags', postController.getTags)
  .post('/tags/post-count', postController.getPostsCountBypost)

module.exports = router
