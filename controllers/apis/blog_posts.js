
//const redis = require('../util/redis')
const status = require('../../util/resTemplate')
const postServiece = require('../../services/blog_posts')
const tokenUtil = require('../../util/tokenUtil')

    /**
     * 获取文章列表
     * @param {*} ctx 
     * @param {*} next 
     */
    const getPostByAuthor = async (ctx, next) => {
        let data = await tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.getPostByAuthor) 
        return ctx.response.body = data
    }

    /**
     * 根据文章id获取文章详情
     * @param {*} ctx 
     * @param {*} next 
     */
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
        if (postInfo.tags.length != 0) { // 如果本篇文章含标签
            await _createTags(newPost.data.dataValues.id, postInfo.diffTags, postInfo.tags)
        }
        let post = newPost
        return ctx.response.body = post
    }

    const updatePost = async (ctx, next) => {
        let token = ctx.request.header['x-token'];
        let postInfo = ctx.request.body
        // 同时触发两个异步操作：
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
     * 对于新增文章，表签的处理：
     * 新增tag 之后增加关联post_tags
     * 感觉这样的查询需要开启一个事务。。。
     */
    const _createTags = async (newPostId, addTags, allTags) => {
        postServiece.createTags(addTags).then( // 把新增加的标签插入tags表，返回tags表中所有数据（数组形式)。如果addTags为空数组，执行此操作是为了获取tags表的所有数据，以便进行下面操作。
            v => {
                let newDate = []
                for (let i = 0; i<v.length; i++) { // 对该文章的所有标签与表中对照，所得新数据写入关联表
                    if(allTags.includes(v[i].name)) {
                        newDate.push({
                            postId: newPostId,
                            tagId: v[i].id
                        })
                    }
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
     * 如果更新的标签减少了，导致tags表中的数据无用数据多余了，怎么删除多余数据？后台界面手动管理。（目前）
     * 如果要更新文章，可能会对标签进行更新，采用操作是，先删除关联关系，然后再把这些标签作为新增的标签处理
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

    const deleteTag = async (ctx, next) => {
        let deleteTagsPromise = tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.deleteTag, ctx.request.body.tagId)
        return ctx.response.body = await deleteTagsPromise
    }

    const getPostsBytag =  async (ctx, next) => {
        let postsPromise = tokenUtil.callWithToken(ctx.request.header['x-token'], postServiece.getPostsByTag, ctx.request.body.tagName)
        let posts = await postsPromise
        return ctx.response.body = posts
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
        deleteTag,
        getPostsBytag
    }