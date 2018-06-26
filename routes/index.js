const router = require('koa-router')()
const userServicev= require('../services/users')
const postService = require('../services/posts')
const postControler = require('../controllers/posts')
router.get('/', postControler.index)
.get('/post/:id',async (ctx, next) => {
  let data = await postService.getPost({ postID: ctx.params.id })
  let _tags = await postService.getTagsBypost(ctx.params.id)
 
  ctx.render('post.html', {
    post: data,
    tags: _tags
  })
})
.get('/tag/:tag',async (ctx, next) => {
  let data = await postService.getPostsByTag(ctx.params.tag)
  let _link = await postService.getLink(ctx,'post/')
  ctx.render('tag.html',{
    posts: data,
    tag: ctx.params.tag,
    link: _link
  })
})

router.get('/string', async (ctx, next) => {
  ctx.response.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  let data = await postService.getTagsCountByName('php');
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
