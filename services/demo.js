const demoModel = require('../models/demo')

const getbulletins = async () => {
    try {
        return await demoModel.Demo.findAll({
            where: {
                Type: 0
            }
        });
    } catch (error) {
        throw new Error('获取平台公告' + error);
    }
}

module.exports = {
    getbulletins
}