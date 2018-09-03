const indexModel = require('../models/index')
const db = require("../lib/db");
/**
 * 按状态查询订单
 */
const getOrders = async (status) => {
    let order = await indexModel.Order.findAll({
        where: {
            Status: status
        }
    })

    return order
}


/**
 * 历史订单
 */

const historyOrders = async (statusArr) => {
    let order = await indexModel.Order.findAll({
        where: { 
            Status: {
                [db.Op.or]: statusArr
            }
        }
    })

    return order
}

/**
 * 申诉列表
 */

const complainList = async () => {
    let list = await indexModel.Complain.findAll()

    return list
}


module.exports = {
   getOrders,
   historyOrders,
   complainList
}