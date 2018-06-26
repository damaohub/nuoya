const userModel = require('../models/AdminUser')

    const addUser = async (data) => {
        try {
            // var t = await sequelize.transaction()            
            var queryData = [
                { username: data.name },
                { email: data.email }
            ]
            let oldUser = await userModel.User.find({ where: { $or: queryData } }, )
            if (oldUser) {
                return { code: 400, msg: '用户已存在' }
            }
            let newUser = await userModel.User.create(data)
            if (newUser.userRole == 3 && data.time == 1) {
                //let e = await emailUtil.sendMail(newUser.userEmail, '认证邮件')
            }
            // t.commit();
            return newUser;
        } catch (err) {
            console.error(err);
            //  t.rollback();
            throw new Error(err);
        }
    }

    const addAdminRole = async (userId, _roleId) => {
        try {
            let newDate = {adminuserId: userId, roleId: _roleId}
            let data = await userModel.AdminRole.create(newDate)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const login = async (loginName, pw) => {   
        try {
            let queryData = [
                { username: loginName }
            ];
            let User = await userModel.User.find({ where: { $or: queryData } })
            return User;
        } catch (err) {
            throw new Error(err);
        }
    }
    const getUser = async (authorInfo) => {
        try {
            let userInfo = await userModel.User.find({  //查找单条find
                where: {
                    uuid: authorInfo.userUuid
                },
                attributes: ['email','username']
            })
            let roleUser = await userModel.Role.findAll({
                include: [{
                    model: userModel.User,
                    where: { id: authorInfo.userId}
                }]   
            })
            var _roles = []
            for (let i=0; i<roleUser.length; i++){
                _roles[i] = roleUser[i].name
            }
            let info = Object.assign(userInfo.dataValues, { roles: _roles })//sequelize的对象经过封装，不能直接合并，dataValues才是数据
            return info
        } catch (error) {
            throw(error)
        }

    }
    const logout = async (token) => {
        try {
            token = null
            return {
                code: 20000,
                msg: '退出成功'
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    module.exports = {
        addUser,
        addAdminRole,
        login,
        getUser,
        logout
    }   