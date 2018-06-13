/*
 * @Author: mao 
 * @Date: 2018-05-22 03:32:05 
 * @Description: model加载器，应用启动时加载所有的model
 * @Last Modified by:    
 * @Last Modified time: 
*/
const fs = require("fs");
const path = require("path");
const debug = require("debug")("application:model");

let files = fs.readdirSync(path.join(__dirname, "..", "/models"));

let jsFiles = files.filter(f => {
    return f.endsWith(".js");
});

module.exports = {};
for (const file of jsFiles) {
    debug("import model from file:", file);
    //注意命名规范,这里用文件名作为model名称
    let fileName = file.substring(0, file.length - 3)
    module.exports[fileName] = require(path.join(__dirname, "..", "/models/", file));
}