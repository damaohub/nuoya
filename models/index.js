const db = require("../lib/db");

const Order = db.defineModel('order_info', {
    UID: {
        type: db.INTEGER
    },
    Info: {
        type: db.STRING
    },
    Type: {
        type: db.INTEGER
    },
    Status: {
        type: db.INTEGER
    },
    OrderPrice: {
        type: db.STRING
    },
    RemainAmount: {
        type: db.STRING
    },
    CreateTime: {
        type: db.STRING,
       
    },
    ExpireTime: {
        type: db.STRING,   
    },
    LastGetTime: {
        type: db.DATE,
        defaultValue: db.NOW
    },
    GetNum: {
        type: db.INTEGER
    },
    WxID: {
        type: db.INTEGER
    },
    Star: {
        type: db.INTEGER
    },
    ExtraType: {
        type: db.INTEGER
    },
    ExtraMsg: {
        type: db.STRING
    },
    PID: {
        type: db.INTEGER
    }
})


module.exports = { Order }
