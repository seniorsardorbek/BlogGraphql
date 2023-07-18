const db = require('../../db');

const removePost = async ({ id }) => {
  const existing = await db('posts').where({ id }).first();

  if (!existing) {
    throw new Error('Post not found');
  }

  return (await db('posts').where({ id }).delete().returning('*'))[0];
};

module.exports = removePost;
