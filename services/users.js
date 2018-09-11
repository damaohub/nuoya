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

    const getUser = async (userId) => {
            let user = await userModel.User.find({  //查找单条find
                where: {
                    ID: userId
                },
                attributes: { exclude: ['Password'] }
            })
            return user  
    }


    const getLowerCount = async (userId) => {
        let lowerCount = await userModel.User.count({
            where: {
                PID: userId
            }
        })
        return lowerCount 
    } 




/**
 * 更新余额(提现)
 */
const updateUesrBalance = async (balance) => {
    let newData =  await userModel.User.update({
        Balance: balance
    },{
        where: {
            ID: userId
        }
    })
    return newData
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
        getLowerCount,
        updateUesrBalance,
        logout
    }   