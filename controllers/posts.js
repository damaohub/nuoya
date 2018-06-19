const postService = require('../services/posts')

    const index = async (ctx, next) => {
        let data = await postService.getPosts()
        let _link = await postService.getLink(ctx,'post/')
        ctx.render('index.html', {
            posts: data,
            link: _link
        })
    }

module.exports = {
    index
}    