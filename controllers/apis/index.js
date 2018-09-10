const indexServiece = require('../../services/index')
const tokenUtil = require('../../util/tokenUtil')
const userServiece = require('../../services/users')

const getOrders = async (ctx, next) => {
    let token = ctx.request.header['x-token']
    let _status = ctx.request.body.status.toString()
    let order = await tokenUtil.callWithToken(token, indexServiece.getOrders, _status)
    return ctx.response.body = order
}

const historyOrders = async (ctx, next) => {
    let token = ctx.request.header['x-token']
    let _status = ctx.request.body.status
    let order = await tokenUtil.callWithToken(token, indexServiece.historyOrders, _status)
    return ctx.response.body = order
}

const complainList = async (ctx, next) => {
    let token = ctx.request.header['x-token']
    let list = await tokenUtil.callWithToken(token, indexServiece.complainList)
    return ctx.response.body = list
}


const billList = async (ctx,next) => {
    let token = ctx.request.header['x-token']
    let _page = ctx.request.body.page
    let _pageSize = ctx.request.body.pageSize
    let  _userInfo = await tokenUtil.prverifySession(token)
    _uId = _userInfo.userId.toString()
    let billInfo ={uid: _uId, page: _page, pageSize: _pageSize}
    
    let list = await tokenUtil.callWithToken(token, indexServiece.moneyInfo,billInfo)
    return ctx.response.body = list
}

const withDraw = async (ctx, next) => {
    let token = ctx.request.header['x-token']
    let body = ctx.request.body
    let  _userInfo = await tokenUtil.prverifySession(token)
    _uId = _userInfo.userId.toString()
    



    let PurseParm = {UID: _uId,Type: 1,Amount:body.amount }
    let [addToPurse, addToMoney, updateUesrBalance] = await Promise.all([userServiece.updateUesrBalance(), indexServiece.addToPurse(),indexServiece.addToMoney()]);
    return ctx.response.body = {
        code: 20000,
        data: [addToPurse, addToMoney, updateUesrBalance],
        msg: 'ok'
    }
}



module.exports = {
    getOrders,
    historyOrders,
    complainList,
    billList,
    withDraw
}
