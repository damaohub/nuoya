/*
 * @Author: mao 
 * @Date: 2018-05-19 13:13:09 
 * @Description: 配置文件加载器，根据开发环境或者产品环境加载不同的配置文件
 * @Last Modified by:    
 * @Last Modified time: 
*/
const fs = require("fs");
const path = require("path");
const isProduction = require("../util/check-env");
const debug = require("debug")("application:config-loader");

/**
 * 根据是否是产品环境来确定加载的配置文件
 * @param {boolean} isProduction true为产品环境，false为开发环境
 */
const devConfigFile = "config-dev.js";
const prodConfigFile = "config-prod.js";
const commonConfigFile = "config-common.js";

let configFile = devConfigFile;
let config;
let commonConfig;
console.log(isProduction)
if (isProduction) {
    configFile = prodConfigFile;
}
try {
    let pathPrefix = path.join(__dirname, "..", "/config/database/");
    let configPath = path.join(pathPrefix, configFile);
    let commonConfigPath = path.join(pathPrefix, commonConfigFile);

    if (fs.statSync(path.join(configPath)).isFile()) {
        config = require(configPath);
    }
    if (fs.statSync(commonConfigPath).isFile()) {
        commonConfig = require(commonConfigPath);
        config = Object.assign({}, config, commonConfig)
    }
    console.log(`load database config file: ${ configFile }`)
} catch (err) {
    debug(`Cannot load database config file: ${configFile}`);
}

module.exports = config;