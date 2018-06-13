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
    uuid: {
        type: db.UUID,
        defaultValue: function () {
            return generateId()
        },
        unique: true
    },
    username: {
        type: db.STRING
    },
    auth_key: {
        type: db.STRING(32)
    },
    password_hash: {
        type: db.STRING
    },
    password_reset_token: {
        type: db.STRING
    },
    email: {
        type: db.STRING
    },
    status: {
        type: db.SMALLINT
    }
})

const Role = db.defineModel('role', {
    name: {
        type: db.STRING(128)
    },
    description: {
        type: db.STRING(128)
    }
})

const UserRole = db.defineModel('UserRole', {
   
})
Role. belongsToMany(User, {through: 'UserRole'})
User.belongsToMany(Role, { through: 'UserRole' })

module.exports = { User, Role, UserRole }
