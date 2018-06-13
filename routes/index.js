const router = require('koa-router')()
const userServicev= require('../service/users')
const postService = require('../service/posts')

router.get('/', async (ctx, next) => {
 let data = await postService.getPosts()
 let _link = await postService.getLink(ctx,'post/')
  ctx.render('index.html', {
    posts: data,
    link: _link
  })
})
.get('/post/:id',async (ctx, next) => {
  let data = await postService.getPostByUuid({ postUuid: ctx.params.id })
  ctx.render('post.html', {
    post: data
  })
})

router.get('/string', async (ctx, next) => {
  ctx.response.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  let data = await userService.getUser(1);
  ctx.response.type = 'application/json';
  ctx.body = data
})

router.post('/posts', async (ctx, next) => {
  const body = ctx.request.body;
  
  let postData = await postService.createPost(body)
  var postBack ={
    id: postData.id,
    title: postData.title,
    tags: postData.tags,
    content: postData.content,
    status: postData.status,
    author_id: postData.author_id,
    created_At: postData.createdAt
  }
  if (!postData.code) {  
    return postBack

  } else {
    return postData
  }
})


module.exports = router
