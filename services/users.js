const userModel = require('../models/user')

    const addUser = async (data) => {
        try {
            var t = await sequelize.transaction()            
            var queryData = [
                { Username: data.name }
            ]
            let oldUser = await userModel.User.find({ where: { $or: queryData } }, )
            if (oldUser) {
                return { code: 400, msg: '用户已存在' }
            }
            let newUser = await userModel.User.create(data)
            if (newUser.userRole == 3 && data.time == 1) {
                //let e = await emailUtil.sendMail(newUser.userEmail, '认证邮件')
            }
             t.commit();
            return newUser;
        } catch (err) {
            console.error(err);
            t.rollback();
            throw new Error(err);
        }
    }

   

    const login = async (loginName, pw) => {  
        let queryData = [
            { Username: loginName }
        ];
        let User = await userModel.User.find({ where: { $or: queryData } })
        return User;
    }

    const getUser = async (authorInfo) => {
       
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
    }

    const logout = async (token) => {
        token = null
        return {
            code: 20000,
            msg: '退出成功'
        }
    }

    module.exports = {
        addUser,
        login,
        getUser,
        logout
    }   