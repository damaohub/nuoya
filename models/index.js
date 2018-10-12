const db = require("../lib/db");
const uuid = require('node-uuid');

function generateId() {
    return uuid.v4();
}
const News = db.defineModel('news',{
    title: {
        type: db.STRING
    },
    content: {
        type: db.TEXT,
        field: "content"
    },
    link: {
        type: db.STRING
    },
    postion: {
        type: db.INT
    }
})

const Links = db.defineModel('links',{
    name: {
        type: db.STRING
    },
    link: {
        type: db.STRING
    }
})

const Top = db.defineModel('top',{
    top_title: {
        type: db.STRING
    },
    top_content: {
        type: db.STRING
    },
    top_link: {
        type: db.STRING
    },
    top_link: {
        type: db.STRING
    }
})

module.exports = { News, Links, Top }
