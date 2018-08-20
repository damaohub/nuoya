const db = require("../lib/db");

const demo = db.defineModel('bulletin_info',{
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
    }
})