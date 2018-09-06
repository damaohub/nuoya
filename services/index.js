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


/**
 * 账单明细（分页）
 */

 const moneyInfo = async (bill) => {
     let money = await indexModel.Money.findAll({
         where: {
              UID: bill.uid
            },
         offset: (bill.page-1) * bill.pageSize,
         limit: bill.pageSize
     })

     return money
 }



module.exports = {
   getOrders,
   historyOrders,
   complainList,
   moneyInfo
}