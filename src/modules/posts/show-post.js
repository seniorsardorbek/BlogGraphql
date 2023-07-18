const db = require('../../db');

const showPost = async ({ id }) => {
  const user = await db('posts').where({ id }).first();

  if (user) {
    throw new Error('Post not found');
  }

  return user;
};

module.exports = showPost;
