const indexModel = require('../models/index')
const getNews = async (pos) => {
    try {
        return await indexModel.News.findAll({
            where: {
                postion: pos
            }
        });
    } catch (error) {
        throw new Error('查询新闻出错' + error);
    }
}

const getAllNews = async () => {
    try {
        return await indexModel.News.findAll();
    } catch (error) {
        throw new Error('查询新闻出错' + error);
    }
}
const createNews = async(info) => {
    let news = {
        title: info.title, 
        content: info.content,
        postion: info.postion, 
        link: info.link
    }
    return await indexModel.News.create(news);
}

const deleteNews = async (info) => {
    let article = await indexModel.News.destroy({
        where: {
            id: info.newsId
        }
    });
    return article
}
const getLinks = async () => {
    try {
        return await indexModel.Links.findAll();
    } catch (error) {
        throw new Error(error);
    }
}

const createLink = async(info) => {
    let news = {
        name: info.name, 
        link: info.link,
    }
    return await indexModel.Links.create(news);
}

const deleteLink = async (info) => {
    let article = await indexModel.Links.destroy({
        where: {
            id: info.linkId
        }
    });
    return article
}
const getTop = async() => {
    try {
        return await indexModel.Top.findAll();
    } catch (error) {
        throw new Error('查询新闻出错' + error);
    }
}

const updateTop = async(info) => {
    return await indexModel.Top.update({
        top_title: info.title, 
        top_content: info.content,
        top_link: info.link
    },{
        where: {
            id: info.id
        }
    });
}

module.exports = {
    getNews,
    getAllNews,
    createNews,
    deleteNews,
    getLinks,
    createLink,
    deleteLink,
    getTop,
    updateTop
}
