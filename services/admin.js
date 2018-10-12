const adminModel = require('../models/admin')
const login = async (loginName, pw) => {
    try {
        let queryData = [
            { username: loginName }
        ];
        let User = await adminModel.User.find({ where: { $or: queryData } })
        return User;
    } catch (err) {
        throw new Error(err);
    }
}

const getUser = async (userId =1) => {
    try {
        let User = await adminModel.User.find({ where: {id: userId} })
        return User;
    } catch (err) {
        throw new Error(err);
    }
}
const saveBanner = async (b, userId=1) => {
    let User = await adminModel.User.update({banner: b},{ where: {id: userId} })
}
module.exports = {
    login,
    getUser,
    saveBanner
}