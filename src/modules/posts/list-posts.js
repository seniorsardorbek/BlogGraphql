const db = require('../../db');

const listPosts = () => {
  return db('posts').where({});
};

module.exports = listPosts;
