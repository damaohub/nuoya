const db = require("../lib/db");

const Demo = db.defineModel('bulletin_info',{
    Type: {
        type: db.INTEGER(11)
    },
    Title: {
        type: db.STRING(128),
        field: "title"
    },
    content: {
        type: db.TEXT,
        field: "content"
    },
    CreateTime: {
        type: db.DATE,
        defaultValue: db.NOW
    },
    UnionID: {
        type: db.INTEGER,
        defaultValue: -1
    }
})

module.exports = {
    Demo
}