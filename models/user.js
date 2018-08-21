/*
 * @Author: mao 
 * @Date: 2018-02-19 19:13:28 
 * @Description: 定义的用户表（user）model
 * @Last Modified by:    
 * @Last Modified time: 
*/
const db = require("../lib/db");
const uuid = require('node-uuid');

function generateId() {
    return uuid.v4();
}
const User = db.defineModel('user_info',{
    Username: {
        type: db.STRING
    },
    
    Password: {
        type: db.STRING
    },
    Type: {
        type: db.INTEGER
    },
    Balance: {
        type: db.INTEGER(11)
    },
    LastOrderPrice: {
        type: db.STRING
    },
    RealName: {
        type: db.STRING
    },
    Alipay: {
        type: db.STRING
    },
    PID: {
        type: db.INTEGER
    },
    InviteCode: {
        type: db.STRING
    },
    Status: {
        type: db.INTEGER
    },
    CountRecharge: {
        type: db.BIGINT(20)
    },
    CreateTime: {
        type: db.DATE,
        defaultValue: db.NOW
    },
    LastUpdateTime: {
        type: db.DATE,
        defaultValue: db.NOW
    }
})

module.exports = { User }
