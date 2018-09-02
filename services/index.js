const indexModel = require('../models/index')

/**
 * 待接单的订单
 */
const getOrders = async (status) => {
    let order = await indexModel.Order.findAll({
        where: {
            Status: status
        }
    })

    return order
}


module.exports = {
   getOrders
}