const demoService = require('../services/demo')


    const index = async (ctx, next) => {
        
        ctx.render('index.html', {
            data: 'test data'
        })
    }

module.exports = {
    index
}    