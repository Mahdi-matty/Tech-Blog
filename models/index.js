const User = require('./user');
const BlogPost = require('./blogpost');

BlogPost.belongsTo(User, {
    onDelete:'CASCADE'
});

module.exports = {
    User,
    BlogPost
}