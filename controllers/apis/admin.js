const status = require('../../util/resTemplate')
const adminServiece = require('../../services/admin')
const indexServiece = require('../../services/index')
const tokenUtil = require('../../util/tokenUtil')


const login = async(ctx, next) => {
    const body = ctx.request.body;
   if(!body.username) {
        return  ctx.response.body = status.paramError('username')
    }else if(!body.password){
        return ctx.response.body = status.paramError('password')
    }
    let userData = await adminServiece.login(body.username, body.password);
    if (!userData) {
        return status.resApi(ctx,'50000', '用户不存在')
    } else if (userData.password != body.password) {
        return status.resApi(ctx,'50000', '密码不正确')
    }
    let session = await tokenUtil.getSession(userData);
    return status.resApi(ctx, 20000, 'ok', { token: session.token })             
}

const uploads = async (ctx, next) => {
    const _banner = `http://yb88888888.com/uploads/${ctx.req.file.filename}`
    adminServiece.saveBanner( _banner)
    return status.resApi(ctx, 20000, '上传成功', { banner: _banner })
}

const getLinks = async (ctx, next) => {
    let links = await tokenUtil.callWithToken(ctx.request.header['x-token'], indexServiece.getLinks, ctx.request.query)
    return ctx.response.body = links
}
const createLinks = async (ctx, next) => {
    let links = await tokenUtil.callWithToken(ctx.request.header['x-token'], indexServiece.createLink, ctx.request.body)
    return ctx.response.body = links
}
const deleteLinks = async (ctx, next) => {
    let links = await tokenUtil.callWithToken(ctx.request.header['x-token'], indexServiece.deleteLink, ctx.request.body)
    return ctx.response.body = links
}
const getNews = async (ctx, next) => {
    let news = await tokenUtil.callWithToken(ctx.request.header['x-token'], indexServiece.getAllNews, ctx.request.query)
    return ctx.response.body = news
}
const createNews = async (ctx, next) => {
    let news = await tokenUtil.callWithToken(ctx.request.header['x-token'], indexServiece.createNews, ctx.request.body)
    return ctx.response.body = news
}
const deleteNews = async (ctx, next) => {
    let news = await tokenUtil.callWithToken(ctx.request.header['x-token'], indexServiece.deleteNews, ctx.request.body)
    return ctx.response.body = news
}

const updateTop = async (ctx, next) => {
    let news = await tokenUtil.callWithToken(ctx.request.header['x-token'], indexServiece.updateTop, ctx.request.body)
    return ctx.response.body = news
}
module.exports = {
    login,
    uploads,
    getLinks,
    createLinks,
    deleteLinks,
    getNews,
    createNews,
    deleteNews,
    updateTop
}