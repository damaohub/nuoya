const demoService = require('../services/demo')


    const index = async (ctx, next) => {
    // let damoData = await demoService.getbulletins()
    // let dataStr = JSON.stringify(damoData)
        ctx.render('index.html', {
            data: 'testData'
        })
    }

module.exports = {
    index
}    