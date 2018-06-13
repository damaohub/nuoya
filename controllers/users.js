//const redis = require('../util/redis')
const status = require('../util/resTemplate')
const userServiece = require('../service/users')
const saltMd5 = require('../util/saltMD5')
const uuid= require('../util/UuidUtil')
const tokenUtil = require('../util/tokenUtil')
module.exports = {
    addUser: async (ctx,next) => {
        var params = ctx.request.body;
        if(!params.username){
            return status.paramError('username')
        }else if(!params.email){
            return status.paramError('email')
        }
        let _uuid = await uuid.db32()
        let password_hash = saltMd5.md5Salt(params.password, _uuid)//用生成的uuid 做盐
        let profile = '默认角色'
        let user = { uuid: _uuid, username: params.username, email: params.email, password_hash: password_hash, profile: profile}
       let uData = await userServiece.addUser(user);
       return uData
    },
    login: async(ctx, next) => {
            const body = ctx.request.body;
            // await redis.setToken('123456','123456')
            // let redisCode = await redis.getToken('123456')
            // console.log(redisCode)
            if(false){// 忽略
                return status.paramError('redisCode')
            }else if(!body.username) {
                return status.paramError('username')
            }else if(!body.password){
                return status.paramError('password')
            }
            let userData = await userServiece.login(body.username, body.password);
            console.log(userData)
            if (!userData) {
                return status.resApi('auth: user_not_found', '用户不存在')
            } else if (userData.password_hash != saltMd5.md5Salt(body.password, userData.uuid)) {
                return status.resApi('auth: pass_error', '密码不正确')
            }
            let userWithToken = await tokenUtil.getSession(userData);
            return status.resApi(20000, 'ok', { token: userWithToken.token })
                     
    },

    getUserInfo: async(ctx,next) => {
        let token = ctx.request.query.token
        let userInfo = await tokenUtil.callWithToken(token,userServiece.getUser)
        console.log(userInfo)
        return userInfo
    },
    logout: async (ctx,next) => {
        let token = ctx.request.query.token
       return  userServiece.logout(token) 
    }
}