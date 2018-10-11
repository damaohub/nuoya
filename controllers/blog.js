const router = require('koa-router')()
const postsService = require('../services/blog_posts')

const _tagsPromise = postsService.getTags()//上下文(ctx)之外执行一次IO
const _addLink = (model,url) => {
    for(let i = 0;i<model.length; i++) {
        model[i].link = url
    }
    return model
}

/**
 * 路由与控制器写在一起,其实在koa-router中，控制器就是路由中的异步回调函数
 */ 
router.get('/', async (ctx, next) => {
    let _posts = await postsService.getPosts()
    let _tags = await _tagsPromise;
    _addLink(_tags, ctx.request.origin + '/tag/')
    _addLink(_posts, ctx.request.origin + '/post/')
    ctx.render('index.html', {
        posts: _posts,
        tags: _tags
    })
})
.get('/post/:id', async (ctx, next) => {
    const _postPromise = postsService.getPost({ postID: ctx.params.id })
    const _postTagsPromise = postsService.getTagsBypost(ctx.params.id)
    let _tags = await _tagsPromise;
    _addLink(_tags, ctx.request.origin + '/tag/')
    let _post = await _postPromise
    let _postTags = await _postTagsPromise
    ctx.render('post.html', {
        tags: _tags,
        post: _post,
        postTags: _postTags
    })
})

.get('/tag/:tag', async (ctx, next) => {
    let data = await postsService.getPostsByTag(ctx.params.tag)
    console.log(data)
    _addLink(data.rows, ctx.request.origin + '/post/')
    let _tags = await _tagsPromise;
    _addLink(_tags, ctx.request.origin + '/tag/')
    ctx.render('tag.html', {
        tags: _tags,
        posts: data.rows,
        count: data.count,
        tag: ctx.params.tag, 
    })
})


module.exports = router
