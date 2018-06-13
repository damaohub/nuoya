
//const redis = require('../util/redis')
const status = require('../util/resTemplate')
const postServiece = require('../service/posts')
const tokenUtil = require('../util/tokenUtil');
module.exports = {
    getPostByAuthor: async (ctx, next) => {
        let data = await tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.getPostByAuthor) //验证token，回调参数只需要一个（含有个人信息的）token
        return data
    },
    getPost: async (ctx, next) => {
        return tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.getPost, ctx.request.query)//get请求进来的参数ctx.request.query
    },
    deletePost: async (ctx, next) => {
        let data = tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.deletePost, ctx.request.body)//验证token,回调参数只需要传入的参数
        return data
    },

    createPost: async (ctx, next) => {
        let token = ctx.request.header['x-token'];
        return tokenUtil.callWithToken(token, postServiece.createPost, ctx.request.body, true)//验证token,回调参数需要传入的参数和token
         
    },
    updatePost: async (ctx, next) => {
        return tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.updatePost, ctx.request.body)
         
    },

    updateStatus: async (ctx, next) => {
        return tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.updateStatus, ctx.request.body)

    },
}