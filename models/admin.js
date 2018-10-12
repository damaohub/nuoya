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
const User = db.defineModel('user',{
    username: {
        type: db.STRING
    },
    password: {
        type: db.STRING
    },
    banner: {
        type: db.STRING
    }
})


module.exports = { User }
