const postModel = require('../models/blog_post')
const uuid = require('../util/UuidUtil')
const Sequelize = require('sequelize');

    const getPosts = async () => {
        try {
            return await postModel.Post.findAll({
                where: {
                    status: 1
                }
            });
        } catch (error) {
            throw new Error('查询所有文章出错' + error);
        }
    }
    
    const getPost = async (articleInfo, byUuid=false) => {
        if (byUuid) {
            let article = await postModel.Post.find({
                where: {
                    uuid: articleInfo.postUuid
                }
            })
            return article
        }else {
            let article = await postModel.Post.find({
                where: {
                    id: articleInfo.postID
                }
            })
            return article
        }
        
    }
    
    const getPostByAuthor = async (authorInfo) => {
        try {
            let _post = await postModel.Post.findAll({
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
    }

    const createPost = async(info) => {
        let _uuid = await uuid.db32()
        let newArticle = {
            uuid: _uuid, 
            title: info.title, 
            content: info.content,
            status: info.status, 
            author_id: info.userId
        }
        return await postModel.Post.create(newArticle); 
    }

    const updatePost = async (articleInfo) => {
        let article = await postModel.Post.update({
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
    }

    const deletePost = async (articleInfo) => {
        let _postID = articleInfo.postID
        let article = await postModel.Post.destroy({
            where: {
                id: _postID
            }
        });
        return article
    }

    const updateStatus = async (articleInfo) => {
        let postID = articleInfo.postID
        let article = await postModel.Post.update({
            status: articleInfo.status
        },{
            where: {
                id: postID
            }
        })
        return article//这种没有业务数据返回。可以不返回，一般回返回影响行数（1）
    }
    /**
     * 查询tag表获取所有标签
     */
    const getTags = async () => { 
        let tags = await postModel.Tag.findAll()
        return tags;

    }
    /**
     * 查询特定标签下的文章个数
     */
    const getPostsCountByTag = async (tagName) => {
        let postCount = await postModel.Post.count({
            include: [{
                model: postModel.Tag,
                where : { name: tagName }
            }]
        })
        return postCount
    }

    /**
     * 通过文章id来查询文章标签
     *  @param {int} postID
     */
    const getTagsBypost = async (postID) => {
        let postTags = await postModel.Tag.findAll({
            include: [{
                model: postModel.Post,
                where: {id: postID}
            }],
            attributes: ['id','name']
        })
        
        return postTags
    }
    /**
     * 通过标签来查询文章
     * @param {string} tagName 
     */
    const getPostsByTag = async (tagName) => {
        let posts = await postModel.Post.findAndCountAll({
            include: [{
                model: postModel.Tag,
                where : { name: tagName }
            }],
        })

        return posts
    }

    /**
     * tag表新增数据getTagsHander
     * @tags: 新增标签 Array
     * @ 返回所有tag
     * 先查询再更新，需要启动一个事务
     */
    const createTags = async (tags) => {
        try {
            return Sequelize.transaction(function(t) {
                return postModel.Tag.findAll()
            })
            let newDate =[]
            for(let i=0; i<tags.length; i++){
                newDate.push({
                    namee: tags[i],
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                })  
            }
            return await postModel.Tag.bulkCreate(newDate).then(() => {return postModel.Tag.findAll()})
        } catch (error) {
            console.log(error)
        }
        
    }
    /**
     * 
     * 为文章增加标签
     * @param {array} newDate 
     */
    const createPostTagBypost = async (newDate) => {
        try {
            let _newDate =[]
            for (let i=0; i<newDate.length; i++){
                _newDate.push(
                Object.assign(newDate[i],{createdAt: Date.now(), updatedAt: Date.now()})
                )
            }
            await postModel.PostTag.bulkCreate(newDate,{returning: true})
        } catch (error) {
            console.log(error)
        }
        
    }

    /**
     * 
     * 删除文章标签，delete from post_tag
     * @param {int} postID 
     */
    const deletePostTagsByPost = async (postID) => {
        try {
            await postModel.PostTag.destroy({
                where: {
                    postId: postID
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
/**
 * 更新tag的frequency
 * 记录标签对应的文章个数
 */
    const updateTagFrequency = async (frequencys) => {
        try {
            await postModel.Tag.update({
                frequency: frequencys.count + 1
            },{
                where: {id: frequencys.tagId }
            })
        } catch (error) {
            console.log(error)
        }
    }
    const deleteTag = async (tagId) => {
        try {
            let tag = await postModel.Tag.destroy({
                where: {
                    id: tagId
                }
            });
            return tag
        } catch (error) {
            console.log(error)
        }
    }
    const getLink = async (ctx,path='') => {
        return ctx.request.href+path
    }

    module.exports = {
        getPosts,
        getPost,
        getPostByAuthor,
        createPost,
        updatePost,
        deletePost,
        updateStatus,
        getTags,
        getPostsCountByTag,
        getTagsBypost, 
        getPostsByTag,
        createTags,
        createPostTagBypost,
        deletePostTagsByPost,
        updateTagFrequency,
        deleteTag,
        getLink
    }