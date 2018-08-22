const indexModel = require('../models/index')

/**
 * 待接单的订单
 */
const getOrders = async () => {
    let order = await indexModel.Order.findAll({
        where: {
            Status: 2
        }
    })

    return order
}

module.exports = {
   getOrders
}