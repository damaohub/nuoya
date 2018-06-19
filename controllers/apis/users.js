//const redis = require('../util/redis')
const status = require('../../util/resTemplate')
const userServiece = require('../../services/users')
const saltMd5 = require('../../util/saltMD5')
const uuid= require('../../util/UuidUtil')
const tokenUtil = require('../../util/tokenUtil')

    const addUser = async (ctx,next) => {
        var params = ctx.request.body;
        if(!params.username){
            return status.paramError('username')
        }else if(!params.email){
            return status.paramError('email')
        }
        let _uuid = await uuid.db32()//注意let 变量命名相同冲突
        let password_hash = saltMd5.md5Salt(params.password, _uuid)//用生成的uuid 做盐
        let profile = '默认角色'
        let user = { uuid: _uuid, username: params.username, email: params.email, password_hash: password_hash, profile: profile}
        let data = await userServiece.addUser(user)//await,于_uuid后执行,
        ctx.body = {code: 20000, msg: '注册成功'}
    }

    const login = async(ctx, next) => {
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
        if (!userData) {
            return status.resApi('50000', '用户不存在')
        } else if (userData.password_hash != saltMd5.md5Salt(body.password, userData.uuid)) {
            return status.resApi('50000', '密码不正确')
        }
        let session = await tokenUtil.getSession(userData);
        ctx.body = status.resApi(20000, 'ok', { token: session.token })             
    }

    const getUserInfo = async(ctx,next) => {
        let token = ctx.request.query.token
        let userInfo = await tokenUtil.callWithToken(token,userServiece.getUser)
        ctx.body = userInfo
    }

    const logout = async (ctx,next) => {
        let token = ctx.request.query.token
        let data = await  userServiece.logout(token)
        ctx.body = data
    }

    module.exports = {
        addUser,
        login,
        getUserInfo,
        logout
    }