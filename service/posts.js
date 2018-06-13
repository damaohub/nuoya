const postModel = require('../models/post')
const uuid = require('../util/UuidUtil')
const url = require('url')
module.exports = {
    getPosts: async () => {
        try {
         return await postModel.findAll({
                where: {
                    status: 1
                }
            });
        } catch (error) {
            throw new Error('查询所有文章出错');
        }
    },
    getPost: async (articleInfo) => {
        let article = await postModel.find({
            where: {
                id: articleInfo.postID
            }
        })
        return article
    },
    getPostByUuid: async (articleInfo) => {
        let article = await postModel.find({
            where: {
                uuid: articleInfo.postUuid
            }
        })
        return article
    },
    getPostByAuthor: async (authorInfo) => {
        try {
            let _post = await postModel.findAll({
                where: {
                    author_id: authorInfo.userId
                },
                attributes: ['id', 'title', 'updatedAt', 'status', 'author_id']
            });
            let post = Object.assign(_post, { author_name: authorInfo.userName})
            return post
        } catch (error) {
            throw new Error(error);
        } 
    },

    createPost: async(articleInfo) => {
        let _uuid = await uuid.db32()
        let newArticle = {
            uuid: _uuid, 
            title: articleInfo.title, 
            content: articleInfo.content,
            status: articleInfo.status, 
            tags: 'tag',
            author_id: articleInfo.userId
        }
        return await postModel.create(newArticle);
        
    },
    updatePost: async (articleInfo) => {
        let article = await postModel.update({
            title: articleInfo.title,
            content: articleInfo.content,
            status: articleInfo.status
            // author_id: authorInfo.id,
        },{
            where: {
                id: articleInfo.id
            }
        });
        return article
    },

    deletePost: async (data) => {
        let postID = data.postID
        let article = await postModel.destroy({
            where: {
                id: postID
            }
        });
        return article
    },

    updateStatus: async (data) => {
        let postID = data.postID
        let article = await postModel.update({
            status: data.status
        },{
            where: {
                id: postID
            }
        })
         return article//这种没有业务数据返回。可以不返回，一般回返回影响行数（1）
    },

    getLink: async (ctx,path='') => {
        return ctx.request.href+path
    }

}