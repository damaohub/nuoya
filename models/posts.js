const db = require('../db');

const post = db.defineModel('posts', {
    status: {
        type: db.INTEGER(11)    
    },
    author_id: {
        type: db.INTEGER(11)
    },
    title: {
        type: db.STRING(1024),
        field: "title"
    },
    content: {
        type: db.TEXT(1024),
        field: "content"
    },
    tags: {
        type: db.STRING(1024),
        field: "tags"
    }  
});

module.exports = post