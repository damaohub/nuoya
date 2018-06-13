/*
 * @Author: mao 
 * @Date: 2018-05-24 10:09:28 
 * @Description: 检查当前环境是否是产品环境，如果是产品环境返回true,开发环境返回false
 * @Last Modified by:    
 * @Last Modified time: 
*/

function checkEnv() {
    return process.env.NODE_ENV === "production";
}

module.exports = checkEnv();