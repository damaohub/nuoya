
//const redis = require('../util/redis')
const status = require('../../util/resTemplate')
const postServiece = require('../../services/posts')
const tokenUtil = require('../../util/tokenUtil')

    const getPostByAuthor = async (ctx, next) => {
        let data = await tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.getPostByAuthor) 
        return ctx.response.body = data
    }

    const getPost = async (ctx, next) => {
        let getPostPromise = tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.getPost, ctx.request.query)
        let post = await getPostPromise
        return ctx.response.body = post
    }

    const deletePost = async (ctx, next) => {
        let dataPromise = tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.deletePost, ctx.request.body)
        return ctx.response.body = await dataPromise
    }

    const createPost = async (ctx, next) => {
        let token = ctx.request.header['x-token'];
        let postInfo = ctx.request.body
        let newPost = await tokenUtil.callWithToken(token, postServiece.createPost, postInfo, true)
        if (postInfo.tags.length != 0) {
            await _createTags(newPost.data.dataValues.id, postInfo.diffTags, postInfo.tags)
        }
        let post = newPost
        return ctx.response.body = post
    }

    const updatePost = async (ctx, next) => {
        let token = ctx.request.header['x-token'];
        let postInfo = ctx.request.body
        let updatePostPromise = tokenUtil.callWithToken(token, postServiece.updatePost, postInfo)
        let updateTagsPromise =  tokenUtil.callWithToken(token, _updateTags, postInfo)
        let post = await updatePostPromise
        let tags = await updateTagsPromise
        return ctx.response.body = post
    }

    const updateStatus = async (ctx, next) => {
        let dataPromise  = tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.updateStatus, ctx.request.body)
        return ctx.response.body = await dataPromise
    }
    /**
     * 
     * 新增tag 之后增加post_tags
     */
    const _createTags = async (newPostId, addTags, allTags) => {
        postServiece.createTags(addTags).then(
            v => {
                let newDate = []
                for (let i = 0; i<v.length; i++) {
                    if(allTags.includes(v[i].name)  )
                    newDate.push({
                        postId: newPostId,
                        tagId: v[i].id
                    })
                }
                postServiece.createPostTagBypost(newDate)
            }
        ).catch( e => {
            return {
                code: 50000,
                msg: '文章标签添加失败',
                data: e
            }
        })
    }
    /**
     * 删除再增加等于更新
     */
    const _updateTags = async (postInfo) => {
        postServiece.deletePostTagsByPost(postInfo.id).then(
            v => {
                _createTags(postInfo.id, postInfo.diffTags, postInfo.tags)
            }
        ).catch( e => {console.log('update tags error: ' + e)})
    }

    /**
     * 根据文章id获取文章tags
     * @param {*} ctx 
     * @param {*} next 
     */
    const getTagsBypost = async (ctx, next) => {
        let getTagsPromise = tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.getTagsBypost, ctx.request.query.postID)
        let tags = await getTagsPromise
        return ctx.response.body = tags
    }

    /**
     * 获取所有tags
     * @param {*} ctx 
     * @param {*} next 
     */
    const getTags = async (ctx, next) => {
        let getTagsPromise = tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.getTags)
        return ctx.response.body = await getTagsPromise
    }

    const getPostsCountBypost =  async (ctx, next) => {
        let postsCountPromise = tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.getPostsCountByTag, ctx.request.body.tagName)
        let postsCount = await postsCountPromise
        return ctx.response.body = postsCount
    }

    module.exports = {
        getPostByAuthor,
        getPost,
        deletePost,
        createPost,
        updatePost,
        updateStatus,
        getTagsBypost,
        getTags,
        getPostsCountBypost
    }