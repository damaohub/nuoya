//const redis = require('../util/redis')
const status = require('../../util/resTemplate')
const userServiece = require('../../services/users')
const saltMd5 = require('../../util/saltMD5')
const tokenUtil = require('../../util/tokenUtil')

    const addUser = async (ctx,next) => {
        var params = ctx.request.body;
        if(!params.username){
            return ctx.response.body = status.paramError('username')
        }
        let password_hash = saltMd5.md5(params.password)
     
        let user = { Username: params.username, Password: password_hash }
        let newUser = await userServiece.addUser(user) //await,于_uuid后执行,
        return ctx.response.body = { code: 20000, msg: '注册成功'}
    }

    

    const login = async(ctx, next) => {
        const body = ctx.request.body;
        // await redis.setToken('123456','123456')
        // let redisCode = await redis.getToken('123456')
        // console.log(redisCode)
        if(false){// 忽略
            status.paramError('redisCode')
        }else if(!body.username) {
            return  ctx.response.body = status.paramError('username')
        }else if(!body.password){
            return ctx.response.body = status.paramError('password')
        }
        let userData = await userServiece.login(body.username);
        if (!userData) {
            return status.resApi(ctx,'50000', '用户不存在')
        } else if (userData.Password != saltMd5.md5(body.password)) {
            return status.resApi(ctx,'50000', '密码不正确')
        }
        let session = await tokenUtil.getSession(userData);
        return status.resApi(ctx, 20000, 'ok', { token: session.token})             
    }

    const getUser = async(ctx,next) => {
        let token = ctx.request.header['x-token']
        let _userInfo = await tokenUtil.prverifySession(token)
        let userInfo = await tokenUtil.callWithToken(token,userServiece.getUser,_userInfo.userId)
        let _count = await userServiece.getLowerCount(_userInfo.userId)
        Object.assign(userInfo.data.dataValues,{lowerCount: _count})
        return ctx.response.body = userInfo
    }

   

    const logout = async (ctx,next) => {
        let token = ctx.request.query.token
        let data = await  userServiece.logout(token)
        return status.resApi(ctx,20000,'ok',data)
    }

    module.exports = {
        addUser,
        login,
        getUser,
        logout
    }