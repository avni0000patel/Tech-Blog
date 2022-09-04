const { Post } = require('../models');

const postData = [
    {
        title: ,
        content: ,
        user:
    },
    {
        title: ,
        content: ,
        user:
    },
    {
        title: ,
        content: ,
        user:
    },
    {
        title: ,
        content: ,
        user:
    },
    {
        title: ,
        content: ,
        user:
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;