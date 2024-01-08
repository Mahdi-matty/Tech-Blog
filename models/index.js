const User = require('./user');
const BlogPost = require('./blogpost');
const Comment = require('./comments')

BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(BlogPost, {
    foreignKey: 'user_id'
})
Comment.belongsTo(BlogPost, {
    foreignKey: 'post_id'
});
BlogPost.hasMany(Comment, {
    foreignKey: 'post_id'
})
Comment.belongsTo(User, {
    foreignKey: 'users_id'
})

module.exports = {
    User,
    BlogPost,
    Comment
}