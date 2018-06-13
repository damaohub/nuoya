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
const User = db.defineModel('adminuser',{
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
    password_hash: {
        type: db.STRING
    },
    email: {
        type: db.STRING
    },
    profile: {
        type: db.TEXT
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

const AdminRole = db.defineModel('admin_role', {
    id: {
        type: db.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
})
Role.belongsToMany(User, { through: 'admin_role'})
User.belongsToMany(Role, { through: 'admin_role' })

module.exports = { User, Role, AdminRole }
