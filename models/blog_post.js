const db = require("../lib/blog-db");
const uuid = require('node-uuid');

function generateId() {
    return uuid.v4();
}

const Post = db.defineModel('blog_posts', {
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
    }
});

const Tag = db.defineModel('blog_tag', {
    name: {
        type: db.STRING(128)
    },
    frequency: {
        type: db.INTEGER(11)
    }
})

const PostTag = db.defineModel('blog_post_tag', {
    id: {
        type: db.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
})
Tag.belongsToMany(Post, { through: 'blog_post_tag', foreignKey: 'tagId'})
Post.belongsToMany(Tag, { through: 'blog_post_tag', foreignKey: 'postId' })

module.exports = {Post, Tag, PostTag}