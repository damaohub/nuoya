/*
 * @Author: mao 
 * @Date: 2018-05-18 19:46:16 
 * @Description: 数据库配置文件
 * @Last Modified by:    
 * @Last Modified time: 
*/
// const Op = require("sequelize").Op;
const DbConfig = {
    database: "blog",
    username: "root",
    password: "0drmfslx89*M",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    //连接池的配置
    // poolConfig: {
    //     max: 10,
    //     min: 0,
    //     idle: 3000
    // },
    // operatorsAliases: {
    //     $and: Op.and,
    //     $or: Op.or,
    //     $eq: Op.eq,
    //     $gt: Op.gt,
    //     $lt: Op.lt,
    //     $lte: Op.lte,
    //     $like: Op.like
    // }
}

module.exports = DbConfig;