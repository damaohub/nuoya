const db = require("../lib/db");
const uuid = require('node-uuid');

function generateId() {
    return uuid.v4();
}

const post = db.defineModel('post', {
    uuid: {
        type: db.UUID,
        defaultValue: function () {
            return generateId()
        },
        unique: true
    },
    status: {
        type: db.INTEGER(11)    
    },
    author_id: {
        type: db.INTEGER(11)
    },
    title: {
        type: db.STRING(128),
        field: "title"
    },
    content: {
        type: db.TEXT,
        field: "content"
    },
    tags: {
        type: db.TEXT,
        field: "tags"
    }  
});

module.exports = post