/*
 * @Author: mao 
 * @Date: 2018-05-18 18:21:37 
 * @Description: 通用配置文件，很多时候开发环境和测试环境只是账号密码的不同
 * 其他绝大部分配置是相同的，所以将相同的配置抽离出来，其他不同的单独配置
 * @Last Modified by:    
 * @Last Modified time: 
*/
const Op = require("sequelize").Op;
const CommonConfig = {
    dialect: "mysql",
    //连接池的配置
    poolConfig: {
        max: 10,
        min: 0,
        idle: 3000
    },
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like
    }
}

module.exports = CommonConfig;