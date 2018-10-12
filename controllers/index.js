const router = require('koa-router')()
const indexService = require('../services/index')
const adminService = require('../services/admin')

router.get('/', async (ctx, next) => {
    let _user = await adminService.getUser(1)
    let _tops = await indexService.getTop()
    let _news1 = await indexService.getNews(1)
    let _news2 = await indexService.getNews(2)
    let _links = await indexService.getLinks()
    ctx.render('index.html', {
        user: _user,
        tops: _tops,
        news1: _news1,
        news2: _news2,
        links: _links
    })
})

module.exports = router