const indexServiece = require('../../services/index')
const tokenUtil = require('../../util/tokenUtil')


const getOrders = async (ctx, next) => {
    let token = ctx.request.body.token
    console.log(token)
    let order = await tokenUtil.callWithToken(token, indexServiece.getOrders)
    return ctx.response.body = order
}

module.exports = {
    getOrders
}