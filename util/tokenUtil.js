/**
 * Created by mao on 17/8/16.
 */
var jwt = require('jsonwebtoken');
// var ObjectId = require('objectid');

function JwtSession() {
}

module.exports = new JwtSession() ;

/**
 * 生成token
 * @param users
 * @param cb
 */
JwtSession.prototype.getSession =  (users) =>{
  var expiresIn = 12 * 60 * 60;
  var payload = {};
    payload.userId = users.id
    payload.userName = users.username
  var options = {
    "expiresIn": expiresIn
  };
  var token = jwt.sign(payload, '3mang', options);
  users.token = token;
  users.tokenTime = expiresIn;
  
   return users;

};

/**
 * 验证token
 * @param token
 * 
 */
JwtSession.prototype.prverifySession =  async(token) => {
  try {
    let back = jwt.verify(token, '3mang');
    return back;
  } catch (e) {
    return {
      code: 50008,
      name: e.name,
      msg: e.message
    }
    
  }
};

/**
 * 验证token，并执行回调函数
 * @param {*} token 必须
 * @param {*} cb 回调函数 必须
 * @param {*} param 传给cb的参数，默认null,此时,cb参数是解析后的token
 * @param {*} isWith param是否携带解析后的token一起作为cb的参数
 */
JwtSession.prototype.callWithToken = async (token, cb, param = null, isWith = false,) => {
  let result = await JwtSession.prototype.prverifySession(token)
  if ("code" in result) {//token不合法
    return result;
  } else {
    var arg
    if(param == null){
      arg = result
    }else {
      arg = isWith ? Object.assign(param, result) : param
    }
    let data = await cb(arg)//cb(arg)是服务层返回的promise,在这里需要获取数据。
    //为保持和token验证错误(api接口格式）一致，返回包装后的对象
    return {
      code: 20000,
      msg: 'ok',
      data: data
    }
  }

};
