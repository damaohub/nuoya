const router = require('koa-router')()
router.prefix('/blog')
const blogUSerController = require('../controllers/apis/blog_users')
const blogPostController = require('../controllers/apis/blog_posts')
router.post('/login',blogUSerController.login)
    .post('/regist',blogUSerController.addUser)
    .post('/info',blogUSerController.getUserInfo)

router.post('/post-list',blogPostController.getPostByAuthor)
    .post('/post-upstat',blogPostController.updateStatus)
    .post('/post-delete',blogPostController.deletePost)
    .get('/post-detail',blogPostController.getPost)
    .get('/tags',blogPostController.getTags)
    .post('/post-create',blogPostController.createPost)
    .post('/post-update',blogPostController.updatePost)
    .post('/tag-posts',blogPostController.getPostsBytag)
    .post('/tag-delete',blogPostController.deleteTag)
    
module.exports = router