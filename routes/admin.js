const router = require('koa-router')()
router.prefix('/api')
const upload = require('../util/multerUpload')
//multer有single()中的名称必须是表单上传字段的name名称。
const adminController = require('../controllers/apis/admin')
router.post('/login', adminController.login)
    .post('/upload',  upload.single('file'), adminController.uploads)
    .get('/links', adminController.getLinks)
    .get('/news', adminController.getNews)
    .post('/create-news', adminController.createNews)
    .post('/create-links', adminController.createLinks)
    .post('/delete-news', adminController.deleteNews)
    .post('/delete-links', adminController.deleteLinks)
    .post('/update-top', adminController.updateTop)
    
module.exports = router
