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
        type: db.DATE,
        defaultValue: db.NOW
    },
    ExpireTime: {
        type: db.DATE,
      
    },
    LastGetTime: {
        type: db.DATE,
       
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


const Complain = db.defineModel('complain_info', {
    PID: {
        type: db.INTEGER
    },
    OID: {
        type: db.INTEGER
    },
    Content: {
        type: db.TEXT
    },
    Status: {
        type: db.INTEGER
    },
    CreateTime: {
        type: db.DATE,
        defaultValue: db.NOW
    },
})

module.exports = {
    Order,
    Complain
}
