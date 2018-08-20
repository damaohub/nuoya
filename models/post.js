const db = require("../lib/db");
const uuid = require('node-uuid');

function generateId() {
    return uuid.v4();
}

const Post = db.defineModel('post', {
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
    CreateTime: {
        type: db.DATE,
        defaultValue: db.NOW
    },
    UnionID: {
        type: 
    }
});

const Tag = db.defineModel('tag', {
    name: {
        type: db.STRING(128)
    }
})

const PostTag = db.defineModel('post_tag', {
    id: {
        type: db.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
})
Tag.belongsToMany(Post, { through: 'post_tag'})
Post.belongsToMany(Tag, { through: 'post_tag' })

module.exports = {Post, Tag, PostTag}